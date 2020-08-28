import ffmpegStatic from "ffmpeg-static"
import ffprobeStatic from "ffprobe-static"
import ffmpeg  from 'fluent-ffmpeg'

let ffmpegPath = ffmpegStatic.path
let ffprobePath = ffprobeStatic.path

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)

export function getMeta(url) {
  return new Promise((resolve, reject) => {
    console.log(ffmpeg)
    ffmpeg(url).ffprobe((err, metaData) => {
      console.log(metaData)
      resolve(metaData)
    })
  })
}
