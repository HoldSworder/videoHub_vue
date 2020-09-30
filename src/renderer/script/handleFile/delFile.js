const path = require('path')
const fs = require('fs')
const fsp = fs.promises

async function delFile(dirPath) {
  if (fs.statSync(dirPath).isFile()) {
    fs.unlinkSync(dirPath)
    return
  }

  const files = await fsp.readdir(dirPath)
  if (files.length === 0) {
    await fsp.rmdir(path)
    return
  }

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
