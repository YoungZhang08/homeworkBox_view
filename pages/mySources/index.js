// pages/messages/index.js
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: null,
  },

  // 获取自己的消息列表
  getMyResources() {
    request({
      pathName: '/findUserResources',
      data: { userId: app.globalData.openId },
      method: 'GET',
    })
      .then((data) => {
        console.log(data)
        if (data.data) {
          console.log(data.data)
          this.setData({ list: data.data })
        } else {
          this.setData({ list: null })
        }
      })
      .catch(() => {
        toast()
      })
  },

  onLoad() {
    this.getMyResources()
  },
})
