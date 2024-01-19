import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'
import Pptx from '@/src/models/Pptx'

export const POST = async request => {
  const { title, url, download } = await request.json()

  await connect()

  const newPptx = new Pptx({
    title,
    url,
    download
  })

  try {
    await newPptx.save()
    return new NextResponse('Pptx is saveed', { status: 200 })
  } catch (err) {
    return new NextResponse(err, {
      status: 500
    })
  }
}
