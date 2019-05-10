const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    boxId: '',
    title: '',
  },

  download() {
    const { boxId, title } = this.data
    console.log(boxId, title)
    wx.getSavedFileList({  // 获取文件列表
      success(res) {
        console.log(res)
        res.fileList.forEach((val, key) => { // 遍历文件列表里的数据
          // 删除存储的垃圾数据
          console.log(typeof val.filePath)
          const fs = wx.getFileSystemManager()
          fs.unlink({
            filePath: val.filePath,
            complete(res) {
              console.log(res)
            }
          });
        })
      }
    })
    wx.downloadFile({
      url: `http://localhost:8080/homework/downloadResources?boxId=${boxId}&title=${title}`, // 仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log(res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(res){
            console.log(res)
            wx.openDocument({
              filePath: res.savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
                console.log(res)
              },
              fail: function (err) {
                console.log(err)
              }
            });
          },
          fail: function(err){
            console.log(err)
          }
        })
      }
    })
  },

  onLoad(options) {
    this.setData({
      boxId: options.boxId,
      title: options.title,
    })
  },
})
