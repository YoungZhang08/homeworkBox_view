const app = getApp()
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  data: {
    boxId: '',
    fileName: '',  // 文件名
  },

  // 实时更新资源名称
  bindFileName(e) {
    this.setData({ fileName: e.detail.value })
  },

  // 发布资源
  uploadFile() {
    let that = this
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success(res) {
        // console.log(res)
        let filePath = res.tempFiles[0].path // 本地文件路径
        console.log(that.data.boxId, that.data.fileName, filePath)
        wx.uploadFile({
          url: 'http://localhost:8080/homework/createResources', // 仅为示例，非真实的接口地址
          filePath: filePath,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            "accept": "application/json",
          },
          formData: {
            'boxId': that.data.boxId,
            'title': that.data.fileName
          },
          success(res) {
            let data = JSON.parse(res.data)
            if (data.status == 400) {
              toast(data.msg, 'fail')
            } else if (data.status == 200) {
              toast(data.msg, 'success')
              setTimeout(() => {
                wx.navigateBack({ delta: 1 })
              }, 500)
            }
          },
          fail(res) {
            console.log(res)
            toast(res.errMsg, 'fail')
          }
        })
      }
    })
  },

  onLoad(options) {
    let that = this
    wx.getStorage({
      key: 'boxid',
      success: function (res) {
        that.data.boxId = res.data
      },
    })
  }
})
