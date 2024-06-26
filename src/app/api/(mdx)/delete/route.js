import { NextResponse } from 'next/server'
import { rmdir } from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

export const DELETE = async (req, res) => {
  const formData = await req.formData()
  const folderName = formData.get('fileName').toLowerCase().replace(/\s+/g, '-')

  try {
    const folderPath = path.join(process.cwd(), 'content', folderName)

    const success = await rmdir(folderPath, { recursive: true })

    // revalidatePath('/')

    // return NextResponse.json({
    //   message: 'Success',
    //   folderPath: folderPath,
    //   status: 200
    // })
    return Response.json({ revalidated: true, now: Date.now(), status: 200 })
  } catch (error) {
    return NextResponse.json({
      error: 'Error deleting folder',
      message: error.message,
      status: 500
    })
  }
}
