const fs = require('fs')
const path = require('path')

function getAllFiles (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}

function listPages () {
  const pagesDir = path.join(__dirname, 'src/app')
  const allFiles = getAllFiles(pagesDir)

  const pages = allFiles
    .filter(
      file =>
        file.endsWith('page.jsx') ||
        file.endsWith('page.tsx') ||
        file.endsWith('page.js') ||
        file.endsWith('page.ts')
    )
    .map(file =>
      file
        .replace(pagesDir, '')
        .replace(/\\/g, '/')
        .replace(/\/page.(js|jsx|ts|tsx)$/, '')
    )

  console.log('Available Pages:')
  pages.forEach(page => console.log(page || '/'))
}

listPages()
