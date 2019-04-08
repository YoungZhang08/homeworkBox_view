const { request } = require('../../utils/request')
const { toast } = require('../../utils/toast')

const app = getApp()

Page({
  data: {
    title: '作业盒子',
    list: null,
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
      data: { boxId: '10625' },
    })
      .then((data) => {
        console.log(data.data)
        if (data.data) {
          console.log(data.data)
          // this.setData({ list: data.data })
        } else {
          // this.setData({ list: null })
        }
      })
      .catch(() => {
        toast()
      })
  },
  getSources() {
    console.log('拿资源')
  },
  getUsers() {
    request({
      pathName: '/getUsers',
      method: 'GET',
      data: { boxId: '10625' },
    })
      .then((data) => {
        console.log(data.data)
        if (data.data) {
          console.log(data.data)
          // this.setData({ list: data.data })
        } else {
          // this.setData({ list: null })
        }
      })
      .catch(() => {
        toast()
      })
  },
  onLoad(options) {
    console.log(options)
    this.getHomework()
  },
})

