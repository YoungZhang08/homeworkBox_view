const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    boxId: '',
    title: '',
  },

  download() {
    const { boxId, title } = this.data
    console.log(boxId, title)

    request({
      pathName: '/downloadResources',
      data: {
        boxId,
        title,
      },
      method: 'GET',
    })
      .then((data) => {
        console.log(data)
        toast(data.msg, 'success')
        setTimeout(() => {
          wx.navigateBack({ delta: 1 })
        }, 500)
      })
      .catch(() => {
        toast('创建失败')
      })
  },

  onLoad(options) {
    this.setData({
      boxId: options.boxId,
      title: options.title,
    })
  },
})
