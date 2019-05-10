const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  data: {
    boxId: '',
    title: '',
    text: '',
    deadline: '',
  },

  // 实时更新作业名称
  bindTitle(e) {
    this.setData({ title: e.detail.value })
  },

  // 实时更新作业内容
  bindText(e) {
    this.setData({ text: e.detail.value })
  },

  // 实时更新作业上交的截止时间
  bindDeadline(e) {
    this.setData({ deadline: e.detail.value })
  },

  // 创建作业
  createHomework() {
    const {
      title, text, deadline, boxId,
    } = this.data
    console.log(this.data)
    request({
      pathName: '/addHomework',
      data: {
        boxId,
        title,
        text,
        deadline,
      },
      method: 'POST',
    })
      .then((data) => {
        console.log(data)
        toast(data.msg, 'success')
        this.onLoad()
        setTimeout(() => {
          wx.navigateBack({ delta: 1 })
        }, 500)
      })
      .catch(() => {
        toast('发布失败')
      })
  },

  onLoad() {
    const that = this
    wx.getStorage({
      key: 'boxid',
      success(res) {
        that.data.boxId = res.data
      },
    })
  },
})
