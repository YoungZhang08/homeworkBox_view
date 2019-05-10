// pages/users/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    portrait: '',
    name: '',
  },
  onLoad() {
    const that = this
    wx.getStorage({
      key: 'portrait',
      success(res) {
        that.setData({
          portrait: res.data,
        })
      },
    })
    wx.getStorage({
      key: 'name',
      success(res) {
        that.setData({
          name: res.data,
        })
      },
    })
  },
})
