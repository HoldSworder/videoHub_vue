/**
 * @Date         : 2020-09-08 14:52:21
 * @Description  : 文件处理
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-05 11:05:10
 */

import getBasePath from '@/common/basePath.js'
import { readData } from '@/script/handleData'
import { videoType, zipType, imgType } from './extName'
import handleVideo from './handles/handleVideo'
import handleWallpaper from './handles/handleWallpaper'
import store from '@/store'

const path = require('path')
const fse = require('fs').promises

let videoCount = 0
let wallpaperCount = 0

let count = 0
let fileCount = 0

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

// 进行计数，并上传vuex
function setCount() {
  count++
  store.dispatch('state/setProgress', {
    now: count,
    all: fileCount
  })
}

async function getAllFiles(filePath, res = result, recursive = false) {
  const fileArr = await fse.readdir(filePath)
  if (fileCount === 0) fileCount = fileArr.length

  for (const item of fileArr) {
    if (!recursive) setCount()
    const childPath = path.join(filePath, item)
    const stats = await fse.stat(childPath)
    if (stats.isDirectory()) await getAllFiles(childPath, result, true)
    if (stats.isFile()) {
      const extName = path
        .extname(item)
        .toLowerCase()
        .slice(1)

      const baseName = path.basename(item)

      if (videoType.includes(extName)) {
        const isSuccess = await handleVideo({ res, filePath, childPath, baseName, stats })
        if (isSuccess) videoCount++
      }

      if (item === 'project.json') {
        const isSuccess = await handleWallpaper({ res, filePath, childPath, stats })
        if (isSuccess) wallpaperCount++
      }
    }
  }
  return res
}

async function getFiles() {
  videoCount = 0
  wallpaperCount = 0

  const checked = checkFiles()
  result = checked

  const filePath = getBasePath()
  const data = await getAllFiles(filePath)

  console.log('所有视频的数量为', videoCount)
  console.log('wallpaper视频的数量为', wallpaperCount)
  console.log(data)

  store.dispatch('content/setVideoInfo', {
    videoCount,
    wallpaperCount
  })

  return data
}

export default getFiles
