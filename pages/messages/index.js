// pages/messages/index.js
const { request } = require('../../utils/request')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    text: null,
    deadline: null,
    list: null
  },

  // 获取自己的消息列表
  getHomework: function () {
    request({
      pathName: '/getHomework',
      data: { userId: app.globalData.openId },
      method: 'GET'
    })
      .then(data => {
        //console.log(data)
        if (data.data) {
          console.log(data.data)
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
    this.getHomework()
    //console.log(this.getHomework())
  }
})
