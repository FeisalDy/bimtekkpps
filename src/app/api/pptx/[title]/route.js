import Pptx from '@/src/models/Pptx'
import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'

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

export const DELETE = async (req, { params }) => {
  try {
    await connect()
    const deletedPptx = await Pptx.deleteOne({ title: params.title })

    if (!deletedPptx) {
      return NextResponse.json({
        error: 'File not found',
        message: 'File not found',
        status: 404
      })
    }

    return NextResponse.json({
      message: 'File deleted successfully',
      status: 200
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Error deleting file',
      message: error.message,
      status: 500
    })
  }
}
