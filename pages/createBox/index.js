const app = getApp()
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  data: {
    boxId: '',
    course: '',
    className: ''
  },

  // 实时更新课程名称
  bindCourse: function(e) {
    this.setData({ course: e.detail.value })
  },

  // 实时更新班级名称
  bindClassName: function(e) {
    this.setData({ className: e.detail.value })
  },

  // 实时更新id
  bindBoxId: function(e) {
    this.setData({ boxId: e.detail.value })
  },

  // 获取随机id
  getRandom: function() {
    request({
      pathName: '/getRandom',
      method: 'GET'
    })
      .then(data => {
        this.setData({ boxId: data.id })
      })
      ['catch'](err => {
        toast()
      })
  },

  // 创建盒子
  createBox: function() {
    const { boxId, course, className } = this.data

    request({
      pathName: '/createBox',
      data: {
        boxId,
        createId: app.globalData.openId,
        course,
        className
      },
      method: 'POST'
    })
      .then(data => {
        toast(data.msg, 'success')
        setTimeout(() => {
          wx.navigateTo({ url: '../boxes/index' })
        }, 500)
      })
      ['catch'](err => {
        toast('创建失败')
      })
  },
  onLoad: function() {
    this.getRandom()
  }
})
