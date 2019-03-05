const app = getApp()
const { request } = require('../../utils/request')

Page({
  data: {
    boxId: '',
  },
  // 实时更新id
  bindBoxId: function (e) {
    this.setData({
      boxId: e.detail.value
    })
  },
  // 加入盒子
  addBox: function () {
    const { boxId } = this.data
    request({
      url: '/addUserBox',
      data: {
        boxId,
        userId: app.globalData.openId,
      },
      method: 'POST'
    }, (bool, res) => {
      if (bool) {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 500,
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../boxes/index'
          })
        }, 500);
      } else {
        wx.showToast({
          title: '加入失败',
          icon: 'none',
          duration: 500,
        })
      }
    })
  },
  onLoad: function () {
  }
})