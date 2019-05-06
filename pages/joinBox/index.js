const app = getApp()
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  data: { boxId: '' },

  // 实时更新id
  bindBoxId(e) {
    this.setData({ boxId: e.detail.value })
  },

  // 创建盒子
  addBox() {
    const { boxId } = this.data

    request({
      pathName: '/addUserBox',
      data: {
        boxId,
        userId: app.globalData.openId,
      },
      method: 'POST',
    })
      .then((data) => {
        console.log(data)
        toast(data.msg, 'success')
        setTimeout(() => {
          wx.navigateBack({ delta: 1 })
        }, 500)
      })
      .catch(() => {
        toast()
      })
  },
  onLoad() {
    //
  },
})
