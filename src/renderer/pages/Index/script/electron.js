import delFile from '@/script/handleFile/delFile.js'

const { remote } = require('electron')
const { shell, Menu, webContents, dialog } = remote
const ipc = require('electron').ipcRenderer

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

  const rightTemplate = [
    {
      label: '资源管理器中打开',
      click() {
        shell.showItemInFolder(info.file)
      }
    },
    {
      label: '属性',
      click() {
        // setInfo(info)
      }
    },
    {
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
          THAT.$store.dispatch('watch/addWatch', info)
        }
      }
    },
    {
      label: '删除',
      click() {
        delFile(info.file)
      }
    },
    {
      label: '删除文件夹',
      click() {
        delFile(info.menu)
      }
    }
  ]

  const m = Menu.buildFromTemplate(rightTemplate)
  m.popup({ window: remote.getCurrentWindow() })
}

// 判断是否已经打开子进程
function findContent(name) {
  const allWebContents = webContents.getAllWebContents()
  for (const item of allWebContents) {
    // console.log(item.getURL())
  }
  const content = allWebContents.find(x => {
    const contentURL = x.getURL()
    if (!contentURL) return false
    return new URL(x.getURL()).hash === '#/' + name
  })
  return content
}
