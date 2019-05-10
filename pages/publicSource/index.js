const { toast } = require('../../utils/toast')

Page({
  data: {
    boxId: '',
    fileName: '', // 文件名
  },

  // 实时更新资源名称
  bindFileName(e) {
    this.setData({ fileName: e.detail.value })
  },

  // 发布资源
  uploadFile() {
    const that = this
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success(response) {
        // console.log(res)
        const filePath = response.tempFiles[0].path // 本地文件路径
        console.log(that.data.boxId, that.data.fileName, filePath)
        wx.uploadFile({
          url: 'http://localhost:8080/homework/createResources', // 仅为示例，非真实的接口地址
          filePath,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
          },
          formData: {
            boxId: that.data.boxId,
            title: that.data.fileName,
          },
          success(res) {
            const data = JSON.parse(res.data)
            if (data.status === 400) {
              toast(data.msg, 'fail')
            } else if (data.status === 200) {
              toast(data.msg, 'success')
              setTimeout(() => {
                wx.navigateBack({ delta: 1 })
              }, 500)
            }
          },
          fail(res) {
            console.log(res)
            toast(res.errMsg, 'fail')
          },
        })
      },
    })
  },

  onLoad() {
    const that = this
    wx.getStorage({
      key: 'boxid',
      success(res) {
        that.data.boxId = res.data
      },
    })
  },
})
