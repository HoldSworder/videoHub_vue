/**
 * @Date         : 2020-08-13 10:23:46
 * @Description  : 删除文件
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-12-07 15:08:03
 */

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
