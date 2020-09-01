import { isJSON } from '@/common/tool.js'

const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const configPath = path.resolve('./data/config.json')

const layout = {
  dirPath: ''
}

async function saveConfig(newData) {
  let data = { ...layout }

  data = newData
  const str = JSON.stringify(data)
  try {
    fsp.writeFile(configPath, str, 'utf-8')
  } catch (error) {
    throw error
  }
}

function readConfig() {
  let data
  try {
    data = fs.readFileSync(configPath, 'utf-8')
    if (!isJSON(data)) {
      fs.writeFileSync(configPath, JSON.stringify(layout), 'utf-8')
    }
  } catch (err) {
    fsp.writeFile(configPath, JSON.stringify(layout), 'utf-8')
    data = JSON.stringify(layout)
    console.log(err)
  }
  return JSON.parse(data)
}

export { saveConfig, readConfig }
