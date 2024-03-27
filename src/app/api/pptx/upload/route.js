import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'
import Pptx from '@/src/models/Pptx'
import { google } from 'googleapis'
import { getServerSession } from 'next-auth/next'
import { Readable } from 'stream'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = ['http://localhost:3000/oauth2callback']

export const POST = async req => {
  const session = await getServerSession()
  const formData = await req.formData()
  const title = formData.get('title')
  const file = formData.get('file')
  const token = formData.get('accessToken')

  await connect()

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  )
  oauth2Client.setCredentials({ access_token: token })

  try {
    if (!session.user) {
      return NextResponse.json({
        message: 'Unauthorized',
        status: 401,
        token: token
      })
    }

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client
    })

    const uploadedFiles = []
    const uploadResponse = await uploadToDrive(drive, title, file)
    uploadedFiles.push(uploadResponse.data.id)

    let url = `https://drive.google.com/file/d/${uploadResponse.data.id}/preview`
    // let type = file.type
    // if (
    //   type ===
    //   'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    // ) {
    //   url = `https://docs.google.com/presentation/d/${uploadResponse.data.id}/embed?start=false&loop=false&delayms=3000`
    // }

    let type = file.type
    if (
      type ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      const uniqueFileId = uploadResponse.data.id
      const permission = {
        role: 'reader',
        type: 'anyone'
      }
      await drive.permissions.create({
        fileId: uniqueFileId,
        requestBody: permission
      })

      const webViewLink = `https://drive.google.com/file/d/${uniqueFileId}/view`
      const revisionId = uploadResponse.data.headRevisionId
      console.log('revisionId: ', revisionId)

      url = `https://docs.google.com/presentation/d/${uniqueFileId}/embed?start=true&loop=true&delayms=5000&rm=minimal`
    }

    const newPptx = new Pptx({
      title: title,
      url: url,
      download: `https://drive.google.com/uc?id=${uploadResponse.data.id}&export=download`,
      type: file.type
    })

    try {
      await newPptx.save()
      return NextResponse.json({
        message: 'Success',
        title: title,
        file: uploadedFiles,
        status: 201
      })
    } catch (err) {
      return new NextResponse(err, {
        status: 500
      })
    }
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500
    })
  }
}

async function uploadToDrive (drive, title, fileData) {
  const buffer = Buffer.from(await fileData.arrayBuffer())
  const readableStream = Readable.from(buffer)

  const media = {
    mimeType: fileData.mimetype,
    body: readableStream
  }
  const fileMetadata = {
    name: title,
    parents: ['1eJntK8JXq8yrM-JCQWMOQTWdX9Igls2Y']
  }

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, headRevisionId'
    })
    return response
  } catch (error) {
    console.error('Error uploading file to Drive:', error.message)
    throw error
  }
}
