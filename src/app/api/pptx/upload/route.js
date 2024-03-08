import connect from '@/src/utils/db'
import { NextResponse } from 'next/server'
import Pptx from '@/src/models/Pptx'

// export const POST = async request => {
//   const { title, url, download, type } = await request.json()

//   await connect()

//   const newPptx = new Pptx({
//     title,
//     url,
//     download,
//     type
//   })

//   try {
//     await newPptx.save()
//     return new NextResponse('Pptx is saveed', { status: 200 })
//   } catch (err) {
//     return new NextResponse(err, {
//       status: 500
//     })
//   }
// }

export const POST = async req => {
  const formData = await req.formData()

  const title = formData.get('title')
  const file = formData.get('file')

  try {
    return NextResponse.json({
      Message: 'Success',
      title: title,
      file: file,
      status: 201
    })
  } catch (error) {
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
