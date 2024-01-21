import fs from 'fs'
import path from 'path'

export default function handler (req, res) {
  const filePath = path.join(
    process.cwd(),
    'public',
    'loaderio-1aba91b6fe4b957b733701aad5fdb1b2.txt'
  )

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).end()
  }

  // Set the appropriate headers for file download
  res.setHeader(
    'Content-disposition',
    'attachment; filename=loaderio-1aba91b6fe4b957b733701aad5fdb1b2.txt'
  )
  res.setHeader('Content-type', 'text/plain')

  // Read the file and send it as the response
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  res.send(fileContents)
}
