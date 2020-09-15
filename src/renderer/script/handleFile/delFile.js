const path = require('path')
const fs = require('fs')
const fsp = fs.promises

async function delFile(dirPath) {
  const files = await fsp.readdir(dirPath)

  if (files.length === 0) await fsp.rmdir(path)

  for (const item of files) {
    const filePath = path.join(dirPath, item)
    const stats = await fsp.stat(filePath)

    if (stats.isDirectory()) {
      delFile(filePath)
    } else {
      await fsp.unlink(filePath)
      if ((await fsp.readdir(dirPath).length) === 0) {
        await fsp.rmdir(dirPath)
      }
    }
  }
}

export default delFile
