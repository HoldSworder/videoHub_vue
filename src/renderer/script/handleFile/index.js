/**
 * @Date         : 2020-09-08 14:52:21
 * @Description  : 文件处理
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-12-07 15:11:45
 */

import getBasePath from '@/common/basePath.js'
import { readData } from '@/script/handleData'
import { videoType, zipType, imgType } from './extName'
import handleVideo from './handles/handleVideo'
import handleWallpaper from './handles/handleWallpaper'

const path = require('path')
const fse = require('fs').promises

let videoNumber = 0
let wallpaperNumber = 0

let result = []

/**
 * 测试文件路径是否存在
 * @param {*} res
 */
function checkFiles() {
  const dataObj = readData()
  const resArr = [...dataObj.videoFiles, ...dataObj.otherFiles]

  resArr.forEach(async (x, index, arr) => {
    try {
      await fse.access(x.file)
    } catch (error) {
      arr.splice(index, 1)
    }
  })
  return resArr
}

async function getAllFiles(filePath, res = result) {
  const fileArr = await fse.readdir(filePath)

  for (const item of fileArr) {
    const childPath = path.join(filePath, item)
    const stats = await fse.stat(childPath)
    if (stats.isDirectory()) await getAllFiles(childPath)
    if (stats.isFile()) {
      const extName = path
        .extname(item)
        .toLowerCase()
        .slice(1)

      const baseName = path.basename(item)

      if (videoType.includes(extName)) {
        await handleVideo({ res, filePath, childPath, baseName, stats }, videoNumber)
      }

      if (item === 'project.json') {
        await handleWallpaper({ res, filePath, childPath, stats }, wallpaperNumber)
      }
    }
  }
  return res
}

async function getFiles() {
  videoNumber = 0
  wallpaperNumber = 0

  const checked = checkFiles()
  result = checked

  const filePath = getBasePath()
  const data = await getAllFiles(filePath)

  console.log('所有视频的数量为', videoNumber)
  console.log('wallpaper视频的数量为', wallpaperNumber)
  console.log(data)
  return data
}

export default getFiles
