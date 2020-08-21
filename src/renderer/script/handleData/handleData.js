import { isJSON } from '@/common/tool.js'

const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const dataPath = path.resolve('./data/data.json')

const { dataLayout } = require('@/common/layout.js')

async function saveData(newData, type) {
  let data = {...dataLayout}

  switch(type) {
    case 'data':
      data.videoFiles = newData.filter(x => {
        return x.canplay === 1
      })
      data.otherFiles = newData.filter(x => {
        return x.canplay === 0 || x.canplay === 2
      })
      break
    case 'option': 
      data.option = newData
  }
  const str = JSON.stringify(data)
  try {
     fsp.writeFile(dataPath, str, 'utf-8')
  } catch (error) {
    throw error
  }
}

function readData() {
  let data
  try {
    data = fs.readFileSync(dataPath, 'utf-8')
    if(!isJSON(data)) {
      fs.writeFileSync(dataPath, JSON.stringify(dataLayout), 'utf-8')
      console.log('ERROR: is not JSON')
    }
  }catch (err) {
    fsp.writeFile(dataPath, JSON.stringify(dataLayout), 'utf-8')
    data = JSON.stringify(dataLayout)
    console.log(err) 
  }
  return JSON.parse(data)
}

export { saveData, readData }