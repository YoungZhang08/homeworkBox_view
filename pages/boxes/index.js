//index.js
//获取应用实例
const { request } = require('../../utils/request')

const app = getApp()

Page({
  data: {
    title: '作业盒子',
  },
  onReady: function() {
    this.popup = this.selectComponent('.popup')
  },
  showPopup() {
    this.popup.showPopup()
  },
  createBox() {
    this.popup.hidePopup()
  },
  addBox() {
    this.popup.hidePopup()
  },
  //获取加入的盒子
  getAddBoxes: function() {
    request({
      url: '/getAddBoxes',
      method: 'GET',
      data: {
        userId: app.globalData.openId,
      }
    }, (bool, res) => {
      console.log(bool, res)
      if (bool) {
        this.setData({
          msg1: res.msg,
        })
      } else {
        wx.showToast({
          title: '获取失败',
          icon: 'none',
          duration: 500,
        })
      }
    })
  },
  // 获取自己创建的盒子
  getCreateBoxes: function() {
    request({
      url: '/getBoxes',
      data: {
        createId: app.globalData.openId,
      },
      method: 'GET',
    }, (bool, res) => {
      console.log(bool, res)
      if (bool) {
        this.setData({
          msg: res.msg,
        })
      } else {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 500,
        })
      }
    })
  },
  onLoad: function () {
    this.getCreateBoxes()
  },
})
