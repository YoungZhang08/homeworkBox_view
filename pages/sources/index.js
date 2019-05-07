const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

const app = getApp()

Page({
  data: {
    selected: 0,
    isUsers: false,
    isHomework: true,
    isResources: false,
    title: '作业盒子',
    list: null,
    boxId: '',
    popupContent: ['发布作业', '发布资源'],
    popupUrl: ['../createHomework/index', '../publicSource/index'],
  },
  onReady() {
    this.popup = this.selectComponent('#popup')
  },
  showPopup() {
    this.popup.showPopup()
  },
  getHomework() {
    this.setData({ 
      isHomework: true,
      isResources: false,
      isUsers: false
    })
    console.log("isHomework", this.data.isHomework)
    request({
      pathName: '/getBoxHomework',
      method: 'GET',
      data: { boxId: this.data.boxId },
    })
      .then((data) => {
        // console.log(data.data)
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
  getSources() {
    this.setData({
      isHomework: false,
      isResources: true,
      isUsers: false
    })
    console.log("isResources", this.data.isResources)
    request({
      pathName: '/findResources',
      method: 'GET',
      data: { boxId: this.data.boxId },
    })
      .then((data) => {
        // console.log(data.data)
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
  getUsers() {
    // 向子组件box-detail传递isUsers，当isUsers为true，显示用户列表，否则就是其余两个列表
    this.setData({
      isHomework: false,
      isResources: false,
      isUsers: true
    })
    console.log("isUsers", this.data.isUsers)
    request({
      pathName: '/getUsers',
      method: 'GET',
      data: { boxId: this.data.boxId },
    })
      .then((data) => {
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
  active(e) {
    // 获取被点击的id
    const { id } = e.currentTarget.dataset
    // 将id值传给 currentId
    this.setData({
      selected: id
    });
  },
  onLoad(options) {
    this.data.boxId = options.boxId
    wx.setStorage({
      key: 'boxid',
      data: this.data.boxId,
    })
    this.getHomework()
  },
})
