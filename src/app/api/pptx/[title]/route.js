import Pptx from '@/src/models/Pptx'
import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { Readable } from 'stream'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = ['http://localhost:3000/oauth2callback']
// const GOOGLE_REDIRECT_URI = [process.env.GOOGLE_REDIRECT_URI]

export const GET = async (req, { params }) => {
  try {
    await connect()
    // const pptx = await Pptx.where({ title: params.title }).findOne()
    const pptx = await Pptx.findOne({
      title: { $regex: new RegExp(`^${params.title}$`, 'i') }
    })
    return new NextResponse(JSON.stringify(pptx), { status: 200 })
  } catch (error) {
    return new NextResponse('Error getting articles', { status: 500 })
  }
}

export const PUT = async (req, { params }) => {
  await connect()

  const formData = await req.formData()
  const token = formData.get('accessToken')
  const drive = await connectToDrive(token)
  const newTitle = formData.get('title')
  const file = formData.get('file')

  if (!newTitle) {
    return NextResponse.json({
      error: 'Missing title in request body',
      message: 'Please provide a new title to update',
      status: 400
    })
  }

  if (file != 'null') {
    const uploadedFiles = []
    const uploadResponse = await uploadToDrive(drive, newTitle, file)
    uploadedFiles.push(uploadResponse.data.id)

    let url = `https://drive.google.com/file/d/${uploadResponse.data.id}/preview`

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

      const revisionId = uploadResponse.data.headRevisionId
      console.log('revisionId: ', revisionId)

      url = `https://docs.google.com/presentation/d/${uniqueFileId}/embed?start=true&loop=true&delayms=5000&rm=minimal`
    }

    const deletedPptx = await Pptx.findOne({ title: params.title })

    const old_url = deletedPptx.url
    const match = old_url.match(/\/file\/d\/([^\/]+)\/preview/)
    const fileId = match ? match[1] : null

    try {
      const updateResponse = drive.files.update({
        fileId: fileId,
        resource: {
          name: 'deleted_' + deletedPptx.title
        }
      })
      console.log('File renamed on Drive:', updateResponse.data.id)
    } catch (error) {
      console.error('Error renaming file on Drive:', error.message)
    }

    const updateResult = await Pptx.updateOne(
      { title: params.title },
      {
        $set: {
          title: newTitle,
          url: url,
          download: `https://drive.google.com/uc?id=${uploadResponse.data.id}&export=download`,
          type: file.type
        }
      }
    )

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({
        error: 'File not found',
        message: `No file with title "${params.title}" exists`,
        status: 404
      })
    }

    return NextResponse.json({
      error: 'Success updating file',
      status: 200
    })
  } else {
    try {
      const updateResult = await Pptx.updateOne(
        { title: params.title }, // Find by old title
        { $set: { title: newTitle } } // Update the title
      )

      const updatePptx = await Pptx.findOne({ title: newTitle })

      const old_url = updatePptx.url
      const match = old_url.match(/\/file\/d\/([^\/]+)\/preview/)
      const fileId = match ? match[1] : null

      try {
        const updateResponse = drive.files.update({
          fileId: fileId,
          resource: {
            name: newTitle
          }
        })
        console.log('File renamed on Drive:', updateResponse.data.id)
      } catch (error) {
        console.error('Error renaming file on Drive:', error.message)
      }

      if (updateResult.matchedCount === 0) {
        return NextResponse.json({
          error: 'File not found',
          message: `No file with title "${params.title}" exists`,
          status: 404
        })
      }

      return NextResponse.json({
        error: 'Success updating file',
        status: 200
      })
    } catch (error) {
      return NextResponse.json({
        error: 'Error updating file',
        message: error.message,
        status: 500,
        file: file
      })
    }
  }
}

export const DELETE = async (req, { params }) => {
  try {
    const token = req.headers.get('accessToken')
    await connect()
    const drive = await connectToDrive(token)
    const deletedPptx = await Pptx.findOne({ title: params.title })

    if (!deletedPptx) {
      return NextResponse.json({
        error: 'File not found',
        message: 'File not found',
        status: 404
      })
    }

    const url = deletedPptx.url
    const match = url.match(/\/file\/d\/([^\/]+)\/preview/)
    const fileId = match ? match[1] : null

    try {
      const updateResponse = await drive.files.update({
        fileId: fileId,
        resource: {
          name: 'deleted_' + deletedPptx.title
        }
      })
      console.log('File renamed on Drive:', updateResponse.data.id)
    } catch (error) {
      console.error('Error renaming file on Drive:', error.message)
    }

    await Pptx.deleteOne({ title: params.title })

    return NextResponse.json({
      message: 'File deleted successfully',
      status: 200,
      fileId: fileId
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Error deleting file',
      message: error.message,
      status: 500
    })
  }
}

const connectToDrive = async access_token => {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  )

  oauth2Client.setCredentials({ access_token: access_token })

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
  })
  return drive
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
