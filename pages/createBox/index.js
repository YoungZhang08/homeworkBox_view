const app = getApp()
const { request } = require('../../utils/request')

Page({
  data: {
    boxId: '',
    course: '',
    className: ''
  },
  // 实时更新课程名称
  bindCourse: function (e) {
    this.setData({
      course: e.detail.value
    })
  },
  // 实时更新班级名称
  bindClassName: function (e) {
    this.setData({
      className: e.detail.value
    })
  },
  // 实时更新id
  bindBoxId: function (e) {
    this.setData({
      boxId: e.detail.value
    })
  },
  // 获取随机id
  getRandom: function () {
    request({
      url: '/getRandom',
      method: 'GET',
    }, (bool, res) => {
      if (bool) {
        this.setData({
          boxId: res.id
        })
      }
    })
  },
  // 创建盒子
  createBox: function () {
    const { boxId, course, className } = this.data
    request({
      url: '/createBox',
      data: {
        boxId,
        createId: app.globalData.openId,
        course,
        className
      },
      method: 'POST'
    }, (bool, res) => {
      console.log(bool, res)
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
          title: '创建失败',
          icon: 'none',
          duration: 500,
        })
      }
    })
  },
  onLoad: function () {
    this.getRandom()
  }
})