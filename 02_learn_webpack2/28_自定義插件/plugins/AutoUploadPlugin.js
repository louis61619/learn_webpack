const { NodeSSH } = require('node-ssh')

const fs = require('fs')
const path = require('path')

class AutoUploadPlugin {

  constructor(options) {
    this.ssh = new NodeSSH()
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('AutoUploadPlugin', async (compilation, callback) => {
      // console.log("內容已經上傳到服務器了")

      // 1.獲取輸出的文件夾
      const outputPath = compilation.outputOptions.path
      console.log(outputPath)

      // 2.連接服務器
      await this.connectServer()

      // 3. 刪除原目錄中的內容
      const serverDir = this.options.remotePath
      await this.ssh.execCommand(`rm -rf ${serverDir}/*`)

      // 4.上傳到文件服務器
      await uploadFiles(outputPath, serverDir)

      // 5.關閉ssh
      this.ssh.dispose()

      callback()
    })
  }

  async connectServer() {
    await this.ssh.connect({
      host: this.options.host,
      username: this.options.username,
      privateKey: this.options.privateKey
    })

    console.log("連接成功")
  }

  async uploadFiles(localPath, remotePath) {
    await this.ssh.putDirectory(localPath, remotePath)
  }
}

module.exports = AutoUploadPlugin