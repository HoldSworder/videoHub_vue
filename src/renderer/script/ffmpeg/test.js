import ffmpegStatic from 'ffmpeg-static'
import ffprobeStatic from 'ffprobe-static'
import ffmpeg from 'fluent-ffmpeg'

const ffmpegPath = ffmpegStatic.path
const ffprobePath = ffprobeStatic.path

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

export function getMeta(url) {
  return new Promise((resolve, reject) => {
    console.log(ffmpeg)
    ffmpeg(url).ffprobe((err, metaData) => {
      console.log(metaData)
      console.log(err)
      resolve(metaData)
    })
  })
}
