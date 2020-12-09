/**
 * @Date         : 2020-08-13 10:23:46
 * @Description  : 保存、读取data文件
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2020-12-07 15:06:00
 */

import { isJSON } from '@/common/tool.js'

const fs = require('fs')
const fsp = require('fs').promises
const path = require('path')
const dataPath = path.resolve('./data/data.json')

const { dataLayout } = require('@/common/layout.js')

async function saveData(newData, type) {
  const data = { ...dataLayout }

  switch (type) {
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
    if (!isJSON(data)) {
      fs.writeFileSync(dataPath, JSON.stringify(dataLayout), 'utf-8')
      console.error('ERROR: is not JSON')
    }
  } catch (err) {
    fsp.writeFile(dataPath, JSON.stringify(dataLayout), 'utf-8')
    data = JSON.stringify(dataLayout)
    console.error(err)
  }
  return JSON.parse(data)
}

export { saveData, readData }
