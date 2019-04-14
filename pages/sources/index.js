const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

const app = getApp()

Page({
  data: {
    selected: 0,
    isUsers: false,
    title: '作业盒子',
    list: null,
    boxId: '',
    popupContent: ['发布作业', '发布资源'],
    popupUrl: ['../createSource/index', '../publicSource/index'],
  },
  onReady() {
    this.popup = this.selectComponent('#popup')
  },
  showPopup() {
    this.popup.showPopup()
  },
  getHomework() {
    request({
      pathName: '/getBoxHomework',
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
  getSources() {
    // console.log('拿资源')
    // console.log(this.data.boxId)
    request({
      pathName: '/getResource',
      method: 'GET',
      data: { boxId: this.data.boxId },
    })
      .then((data) => {
        console.log(data.data)
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
    this.data.isUsers = true // 向子组件box-detail传递isUsers，当isUsers为true，显示用户列表，否则就是其余两个列表
    console.log(this.data.isUsers)
    request({
      pathName: '/getUsers',
      method: 'GET',
      data: { boxId: this.data.boxId },
    })
      .then((data) => {
        console.log(data.data)
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
      selected: id,
    })
    // console.log(this.data.selected)
  },
  onLoad(options) {
    this.data.boxId = options.boxId
    this.getHomework()
  },
})
