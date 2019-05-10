// index.js
// 获取应用实例
const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

const app = getApp()

Page({
  data: {
    selected: 0,
    title: '作业盒子',
    list: null,
    popupContent: ['创建盒子', '加入盒子'],
    popupUrl: ['../createBox/index', '../joinBox/index'],
  },
  onReady() {
    this.popup = this.selectComponent('#popup')
  },
  showPopup() {
    this.popup.showPopup()
  },
  // 获取加入的盒子
  getAddBoxes() {
    request({
      pathName: '/getAddBoxes',
      method: 'GET',
      data: { userId: app.globalData.openId },
    })
      .then((data) => {
        console.log(data.data)
        if (data.data) {
          this.setData({ list: data.data })
        } else {
          this.setData({ list: null })
        }
      })
      .catch(() => {
        toast()
      })
  },
  // 获取自己创建的盒子
  getCreateBoxes() {
    request({
      pathName: '/getBoxes',
      data: { createId: app.globalData.openId },
      method: 'GET',
    })
      .then((data) => {
        console.log(data.data)
        if (data.data) {
          this.setData({ list: data.data })
        } else {
          this.setData({ list: null })
        }
      })
      .catch(() => {
        toast()
      })
  },
  active(e) {
    // 获取被点击的id
    const { id } = e.currentTarget.dataset
    // 将id值传给 currentId
    this.setData({
      selected: id,
    })
    // console.log(this.data.selected)
  },
  onLoad() {
    this.getCreateBoxes()
  },
})
