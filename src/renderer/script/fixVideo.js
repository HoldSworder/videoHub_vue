import { transTime } from '@/common/tool.js'

const fsp = require('fs').promises
const path = require('path')

function getVideoBase64({ item, width = 240, height = 240 }) {
  const url = item.file
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous')
    video.setAttribute('src', url)
    video.setAttribute('width', width)
    video.setAttribute('height', height)
    video.setAttribute('preload', 'auto')
    video.addEventListener('loadeddata', function() {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(video, 0, 0, width, height)
      const data = canvas.toDataURL('image/jpeg')
      resolve(data)
    })
    video.addEventListener('error', function() {
      reject(Error(path.basename(url) + 'can not play'))
    })
  }).catch(err => {
    item.duration = '格式错误 无法播放'
    item.canplay = false
    console.log(err)
  })
}

async function getVideoDuration({ item, width = 240, height = 240 }) {
  const url = item.file
  if (!fsp.access(url)) return
  if (url.includes('#')) {
    item.duration = '特殊字符 无法解析'
    item.canplay = 2
    return
  }
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous')
    video.setAttribute('src', url)
    if (item.img === '') {
      video.setAttribute('width', width)
      video.setAttribute('height', height)
      video.setAttribute('preload', 'auto')
      video.addEventListener('loadeddata', function() {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d').drawImage(video, 0, 0, width, height)
        const data = canvas.toDataURL('image/jpeg')
        item.img = data

        const durationOrigin = parseInt(video.duration)
        const duration = transTime(durationOrigin)
        item.duration = duration
        item.durationOrigin = durationOrigin
        item.canplay = 1
        resolve()
      })
    } else {
      video.addEventListener('durationchange', function() {
        const duration = parseInt(video.duration)
        const data = transTime(duration)
        item.duration = data
        item.durationOrigin = duration
        item.canplay = 1
        console.log(data)
        resolve()
      })
    }
    video.addEventListener('error', function() {
      reject(Error(path.basename(url) + 'can not play'))
    })
  }).catch(err => {
    item.duration = '格式错误 无法播放'
    item.canplay = 0
    console.log(err)
  })
}

export default getVideoDuration
