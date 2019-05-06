const app = getApp()
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  data: {
    boxId: '',
    title: '',
    url: ''
  },

  // 实时更新资源名称
  bindTitle(e) {
    this.setData({ title: e.detail.value })
  },

  // 实时更新资源
  bindUrl(e) {
    this.setData({ url: e.detail.value })
  },

  // 发布资源
  publicSource() {
    const { title, url } = this.data

    request({
      pathName: '/createResources',
      data: {
        boxId,
        title,
        url,
      },
      method: 'POST',
    })
      .then((data) => {
        toast(data.msg, 'success')
        setTimeout(() => {
          wx.navigateBack({ delta: 1 })
        }, 500)
      })
      .catch(() => {
        toast('发布失败')
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
