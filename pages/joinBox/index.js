const app = getApp()
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  data: { boxId: '' },

  // 实时更新id
  bindBoxId: function (e) {
    this.setData({ boxId: e.detail.value })
  },

  // 创建盒子
  addBox: function () {
    const { boxId } = this.data

    request({
      pathName: '/addUserBox',
      data: {
        boxId,
        userId: app.globalData.openId
      },
      method: 'POST'
    })
      .then(data => {
        toast(data.msg, 'success')
        setTimeout(() => {
          wx.navigateBack({ delta: 1 })
        }, 500)
      })
    ['catch'](err => {
      toast()
    })
  },
  onLoad: function () {

    //
  }
})
