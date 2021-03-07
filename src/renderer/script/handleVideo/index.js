import getVideoDuration from './fixVideo.js'
import { saveData } from '@/script/handleData/handleData.js'
import store from '@/store'

async function fixVideoInfo(data) {
  const length = data.length
  // data.forEach(async (item, index) => {
  //   // store.dispatch('state/setProgress', {
  //   //   now: index + 1,
  //   //   all: length
  //   // })
  //   if (item.duration) return true
  //   getVideoDuration({ item })
  // })

  for (let index = 0; index < data.length; index++) {
    store.dispatch('state/setProgress', {
      now: index + 1,
      all: length
    })
    const item = data[index]
    if (item.duration) return true
    await getVideoDuration({ item })
  }

  // for (const item of data) {
  //   if (item.duration) return true
  //   await getVideoDuration({ item })
  // }
  saveData(data, 'data')
  return data
}

export default fixVideoInfo
