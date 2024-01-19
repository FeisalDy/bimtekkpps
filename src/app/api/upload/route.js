import { NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'

export const POST = async req => {
  const formData = await req.formData()

  const file = formData.get('file')
  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + file.name.replaceAll(' ', '_')
  const imagePath = path.join('public/blogs', filename).replace(/\\/g, '/')
  const relativeImagePath = `/blogs/${filename}` // Relative path starting with 'blog/'
  try {
    await writeFile(path.join(process.cwd(), imagePath), buffer)
    return NextResponse.json({
      Message: 'Success',
      imagePath: relativeImagePath,
      status: 201
    })
  } catch (error) {
    console.log('Error occured ', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
