import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'
import Pptx from '@/src/models/Pptx'
import { google } from 'googleapis'
import { getServerSession } from 'next-auth/next'
import { Readable } from 'stream'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// const GOOGLE_REDIRECT_URI = ['http://localhost:3000/oauth2callback']
const GOOGLE_REDIRECT_URI = [process.env.GOOGLE_REDIRECT_URI]

export const POST = async req => {
  const session = await getServerSession()
  const formData = await req.formData()
  const title = formData.get('title')
  const file = formData.get('file')
  const token = formData.get('accessToken')

  await connect()
  console.log('session: ', session)

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

    let type = file.type
    if (
      type ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      const uniqueFileId = uploadResponse.data.id
      const permission = {
        type: 'anyone',
        role: 'reader',
        // view: 'published',
        allowFileDiscovery: true
      }
      await drive.permissions.create({
        fileId: uniqueFileId,
        requestBody: permission
      })
      //   open_url = `https://docs.google.com/presentation/d/${uniqueFileId}/edit?usp=drive_web&ouid=109412687327996969464&rtpof=true`
      url = `https://docs.google.com/presentation/d/${uniqueFileId}/embed?start=false&loop=false&delayms=3000`
      //   const webViewLink = `https://drive.google.com/file/d/${uniqueFileId}/view`
      //   const revisionId = uploadResponse.data.headRevisionId

      const isAccessible = await fetch(
        `https://docs.google.com/presentation/d/${uniqueFileId}/edit?usp=drive_web&ouid=109412687327996969464&rtpof=true'
      `
      )
        .then(response => {
          if (response.ok) {
            // If the response is ok (status in the range 200-299), the URL is accessible
            return true
          } else {
            // If the response is not ok, the URL is not accessible
            return false
          }
        })
        .catch(error => {
          // If there's an error (network issue, etc.), the URL is not accessible
          console.error('Error accessing the URL:', error)
          return false
        })

      if (isAccessible) {
        // URL is accessible, proceed with assigning the value to url
        console.log('URL is accessible:', open_url)
        // Additional code to handle the accessible URL can go here
        // e.g., displaying the URL to the user or proceeding with other logic
      } else {
        // URL is not accessible
        console.error('URL is not accessible:', open_url)
        // Additional code to handle the inaccessible URL can go here
        // e.g., notifying the user or taking alternative action
      }
    }

    // let url = `https://drive.google.com/file/d/${uploadResponse.data.id}/preview`
    // let type = file.type
    // if (
    //   type ===
    //   'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    // ) {
    //   url = `https://docs.google.com/presentation/d/${uploadResponse.data.id}/embed?start=false&loop=false&delayms=3000`
    // }

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
