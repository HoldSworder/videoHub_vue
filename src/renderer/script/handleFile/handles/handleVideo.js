import { genId } from '@/common/tool.js'

async function video({ res, filePath, childPath, baseName, stats }, videoNumber) {
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
  }

  videoNumber++
}

export default video
