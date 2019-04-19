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
    let that = this;
    wx.getStorage({
      key: 'portrait',
      success: function(res) {
        that.setData({
          portrait: res.data
        });
      },
    });
    wx.getStorage({
      key: 'name',
      success: function (res) {
        that.setData({
          name: res.data
        });
      },
    })
  }
})
