import { NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

export const POST = async (req, res) => {
  //   const { folderName, mdxContent } = req.body
  //   const folder = folderName
  const formData = await req.formData()
  const folderName = formData
    .get('folderName')
    .toLowerCase()
    .replace(/\s+/g, '-')
  const mdxContent = formData.get('mdxContent')

  try {
    const folderPath = path.posix.join(process.cwd(), 'content', folderName)

    await mkdir(folderPath, { recursive: true })
    const success = await writeFile(
      path.join(folderPath, 'index.mdx'),
      mdxContent
    )

    if (success) {
      // Assuming success variable indicates successful creation
      // Send a WebSocket message or broadcast an event to invalidate cache
      //   setCacheInvalidationFlag()
    }

    return NextResponse.json({
      Message: 'Success',
      folderPath: folderPath,
      status: 201
    })
  } catch (error) {
    console.error('Error saving MDX content:', error)
    return NextResponse.json({ Message: 'Failed', status: 500 })
  }
}
