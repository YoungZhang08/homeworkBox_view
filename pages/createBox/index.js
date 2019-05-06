const app = getApp()
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

Page({
  data: {
    boxId: '',
    course: '',
    className: '',
  },

  // 实时更新课程名称
  bindCourse(e) {
    this.setData({ course: e.detail.value })
  },

  // 实时更新班级名称
  bindClassName(e) {
    this.setData({ className: e.detail.value })
  },

  // 实时更新id
  bindBoxId(e) {
    this.setData({ boxId: e.detail.value })
  },

  // 获取随机id
  getRandom() {
    request({
      pathName: '/getRandom',
      method: 'GET',
    })
      .then((data) => {
        this.setData({ boxId: data.id })
      })
      .catch(() => {
        toast()
      })
  },

  // 创建盒子
  createBox() {
    const { boxId, course, className } = this.data

    request({
      pathName: '/createBox',
      data: {
        boxId,
        createId: app.globalData.openId,
        course,
        className,
      },
      method: 'POST',
    })
      .then((data) => {
        toast(data.msg, 'success')
        setTimeout(() => {
          wx.navigateBack({ delta: 1 })
        }, 500)
      })
      .catch(() => {
        toast('创建失败')
      })
  },
  onLoad() {
    this.getRandom()
  },
})
