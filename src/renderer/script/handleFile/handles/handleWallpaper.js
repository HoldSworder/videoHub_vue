/**
 * @Date         : 2020-09-08 17:41:58
 * @Description  : 处理wallpaper文件
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-02 16:03:26
 */

import { genId } from '@/common/tool.js'
import { videoType } from '../extName'

const path = require('path')
const fse = require('fs').promises

async function wallpaperVideo({ res, filePath, childPath, stats }) {
  const content = JSON.parse(await fse.readFile(childPath))
  const type = String(content.type).toLowerCase()
  if (type !== 'video') {
    res.push({
      img: path.join(filePath, content.preview),
      file: path.join(filePath, content.file || ''),
      id: genId(),
      create: stats.birthtimeMs,
      title: content.title,
      menu: filePath,
      name: content.title,
      canplay: 2,
      duration: '非视频文件格式',
      stats: { ...stats }
    })

    console.error('非视频文件格式', content.title)
    return false
  }

  const file = path.join(filePath, content.file)

  // 测试描述文件地址是否存在
  try {
    await fse.access(file)
  } catch (error) {
    console.error('文件描述地址错误', content.title, file)
    return false
  }

  // json描述文件非视频文件
  if (
    !videoType.includes(
      path
        .extname(file)
        .slice(1)
        .toLowerCase()
    )
  ) {
    res.push({
      name: content.title,
      img: path.join(filePath, content.preview),
      file: path.join(filePath, content.file),
      title: content.title,
      menu: filePath,
      id: genId(),
      create: stats.birthtimeMs,
      stats: { ...stats },
      canplay: 2,
      duration: '格式错误 无法播放'
    })
    console.error('格式错误 无法播放', content.title)
    return false
  }

  const target = res.find(x => {
    return x.file === file
  })

  if (target) {
    target.img = path.join(filePath, content.preview)
    target.title = content.title

    target.name = content.title
    target.create = stats.birthtimeMs
    target.wallpaper = true
  } else {
    res.push({
      name: content.title,
      img: path.join(filePath, content.preview),
      file: path.join(filePath, content.file),
      title: content.title,
      menu: filePath,
      id: genId(),
      create: stats.birthtimeMs,
      wallpaper: true,
      stats: { ...stats }
    })
  }

  return true
}

export default wallpaperVideo
