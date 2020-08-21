import { isJSON } from '@/common/tool.js'

const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const configPath = path.resolve('./data/config.json')
const { configLayout } = require('@/common/layout.js')

function saveConfig(newData) {
  let data = {...configLayout, ...newData}

  const str = JSON.stringify(data)
  try {
     fs.writeFileSync(configPath, str, 'utf-8')
  } catch (error) {
    try {
      fs.mkdirSync(path.resolve('./data'))
      fs.writeFileSync(configPath, str, 'utf-8')
    } catch(err) {
      console.log(err) 
    }
    console.log(error) 
  }
}

function readConfig() {
  let data
  try {
    data = fs.readFileSync(configPath, 'utf-8')
    if(!isJSON(data)) fs.writeFileSync(configPath, JSON.stringify(configLayout), 'utf-8')
  }catch (err) {
    fsp.writeFile(configPath, JSON.stringify(configLayout), 'utf-8')
    data = JSON.stringify(configLayout)
    console.log(err) 
    return configLayout
  }
  if(data === '') return configLayout
  return JSON.parse(data)
}

export {saveConfig, readConfig}