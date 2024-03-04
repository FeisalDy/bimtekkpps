import { NextResponse } from 'next/server'
import { rmdir } from 'fs/promises'
import path from 'path'

export const DELETE = async (req, res) => {
  const formData = await req.formData()
  const folderName = formData.get('fileName').toLowerCase().replace(/\s+/g, '-')

  try {
    const folderPath = path.join(process.cwd(), 'content', folderName)

    await rmdir(folderPath, { recursive: true })

    return NextResponse.json({
      message: 'Success',
      folderPath: folderPath,
      status: 200
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Error deleting folder',
      message: error.message,
      status: 500
    })
  }
}
