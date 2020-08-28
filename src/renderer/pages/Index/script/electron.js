const path = require('path')
const fs = window.require('fs')
const fsp = fs.promises

const { remote } = require('electron')
const { shell, Menu, webContents, dialog } = remote
const ipc = window.require('electron').ipcRenderer


// 设置ipc监听器
export function setIpc() {
  const THAT = this
  ipc.on('resetFile', function(event, arg) {
    THAT.$store.dispatch('content/setVideoList', [])
  })

  ipc.on('setVideoFile', function(event, arg) {
    THAT.$store.dispatch('content/setVideoList', [])
    THAT.loadVideo()
  })
}

// 设置右键菜单
export function setRightTemplate(info) {
  const THAT = this

  const rightTemplate = [{
    label: '删除',
    click() {
      delProgram(info.menu)
    }
  }, {
    label: '资源管理器中打开',
    click() {
      shell.showItemInFolder(info.file)
    }
  }, {
    label: '属性',
    click() {
      setInfo(info)
    }
  }, {
    label: '同屏观看',
    click() {
      let content = findContent('watch')
      if (!content) {
        const focuse = webContents.getFocusedWebContents()
        const focuseURL = focuse.getURL()
        window.open(focuseURL + 'watch')
        setTimeout(() => {
          sendWatch()
        }, 1000)
      } else {
        sendWatch()
      }

      function sendWatch() {
        content = findContent('watch')
        let watchList = [...THAT.$store.getters['watch/getWatchList']]
        watchList.push(info)
        THAT.$store.dispatch('watch/setWatchList', watchList)
      }
    }
  }]

  const m = Menu.buildFromTemplate(rightTemplate)
  m.popup({ window: remote.getCurrentWindow() })
}

// 删除文件
async function delProgram(dirPath) {
  const files = await fsp.readdir(dirPath)

  if(files.length === 0) await fsp.rmdir(path)

  for (const item of files) {
    const filePath = path.join(dirPath, item)
    const stats = await fsp.stat(filePath)

    if(stats.isDirectory()) {
      delProgram(filePath)
    }else {
      await fsp.unlink(filePath)
      if(await fsp.readdir(dirPath).length === 0) {
        await fsp.rmdir(dirPath)
      }
    }
  }
}

// 判断是否已经打开子进程
function findContent(name) {
  const allWebContents = webContents.getAllWebContents()
  for (const item of allWebContents) {
    // console.log(item.getURL())
  }
  const content = allWebContents.find(x => {
    const contentURL = x.getURL()
    if(!contentURL) return false
    return new URL(x.getURL()).hash === '#/' + name
  })
  return content
}