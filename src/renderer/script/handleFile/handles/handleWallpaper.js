import { genId } from '@/common/tool.js'
import { videoType } from '../extName'

const path = require('path')
const fse = require('fs').promises

async function wallpaperVideo({ res, filePath, childPath, stats }, wallpaperNumber) {
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
    return
  }

  const file = path.join(filePath, content.file)

  // 测试描述文件地址是否存在
  try {
    await fse.access(file)
  } catch (error) {
    // console.log('文件描述地址错误', error)
    return
  }

  // json描述文件非视频文件
  if (!videoType.includes(path.extname(file).toLowerCase())) {
    console.log(content.title, '格式错误')
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
    return
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
      stats: { ...stats }
    })
  }
  wallpaperNumber++
}

export default wallpaperVideo
