import getVideoDuration from './fixVideo.js'
import { saveData } from '@/script/handleData/handleData.js'

async function fixVideoInfo(data) {
  for (const item of data) {
    if (item.duration) continue
    await getVideoDuration({ item })
  }
  saveData(data, 'data')
  return data
}

export default fixVideoInfo
