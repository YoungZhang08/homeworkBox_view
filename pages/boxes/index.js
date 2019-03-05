// index.js
// 获取应用实例
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

const app = getApp()

Page({
  data: {
    title: '作业盒子',
    list: null
  },
  onReady: function () {
    this.popup = this.selectComponent('.popup')
  },
  showPopup() {
    this.popup.showPopup()
  },
  // 获取加入的盒子
  getAddBoxes: function () {
    request({
      pathName: '/getAddBoxes',
      method: 'GET',
      data: { userId: app.globalData.openId }
    })
      .then(data => {
        if (data.data) {
          this.setData({ list: data.data })
        } else {
          this.setData({ list: null })
        }
      })
    ['catch'](err => {
      toast()
    })
  },

  // 获取自己创建的盒子
  getCreateBoxes: function () {
    request({
      pathName: '/getBoxes',
      data: { createId: app.globalData.openId },
      method: 'GET'
    })
      .then(data => {
        if (data.data) {
          this.setData({ list: data.data })
        } else {
          this.setData({ list: null })
        }
      })
    ['catch'](err => {
      toast()
    })
  },
  onLoad: function () {
    this.getCreateBoxes()
  }
})
