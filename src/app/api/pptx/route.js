import Pptx from '@/src/models/Pptx'
import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'

export const GET = async req => {
  try {
    await connect()
    const url = new URL(req.url) || ''
    const type = url.searchParams.get('type') || ''

    if (type === 'materi') {
      const pptx = await Pptx.find({
        $or: [
          {
            type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
          },
          { type: 'pptx' }
        ]
      })
      return new Response(JSON.stringify(pptx), { status: 200 })
    } else if (type === 'modul') {
      const pptx = await Pptx.find({
        $or: [
          {
            type: 'application/pdf'
          },
          { type: 'pdf' }
        ]
      })
      return new Response(JSON.stringify(pptx), { status: 200 })
    } else {
      const pptx = await Pptx.find({})
      return new Response(JSON.stringify(pptx), { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500
    })
  }
}
