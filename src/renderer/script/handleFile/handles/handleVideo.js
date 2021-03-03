/**
 * @Date         : 2020-09-08 17:41:12
 * @Description  : 处理普通video文件
 * @Autor        : Qzr(z5021996@vip.qq.com)
 * @LastEditors  : Qzr(z5021996@vip.qq.com)
 * @LastEditTime : 2021-03-02 15:48:21
 */

import { genId } from '@/common/tool.js'

async function video({ res, filePath, childPath, baseName, stats }) {
  const target = res.find(x => {
    return x.file === childPath
  })

  if (!target) {
    res.push({
      name: baseName,
      file: childPath,
      id: genId(),
      menu: filePath,
      title: baseName,
      img: '',
      create: stats.birthtimeMs,
      stats: { ...stats }
    })

    return true
  }

  return false
}

export default video
