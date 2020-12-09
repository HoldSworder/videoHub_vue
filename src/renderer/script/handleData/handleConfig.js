/**
 * @Date         : 2020-08-13 10:23:46
 * @Description  : 保存、读取config文件
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-12-07 15:06:25
 */

import { isJSON } from '@/common/tool.js'

const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const configPath = path.resolve('./data/config.json')
const { configLayout } = require('@/common/layout.js')

function saveConfig(newData) {
  const data = { ...configLayout, ...newData }

  const str = JSON.stringify(data)
  try {
    fs.writeFileSync(configPath, str, 'utf-8')
  } catch (error) {
    try {
      fs.mkdirSync(path.resolve('./data'))
      fs.writeFileSync(configPath, str, 'utf-8')
    } catch (err) {
      console.log(err)
    }
    console.log(error)
  }
}

function readConfig() {
  let data
  try {
    data = fs.readFileSync(configPath, 'utf-8')
    if (!isJSON(data)) {
      fs.writeFileSync(configPath, JSON.stringify(configLayout), 'utf-8')
    }
  } catch (err) {
    fsp.writeFile(configPath, JSON.stringify(configLayout), 'utf-8')
    data = JSON.stringify(configLayout)
    console.log(err)
    return configLayout
  }
  if (data === '') return configLayout
  return JSON.parse(data)
}

export { saveConfig, readConfig }
