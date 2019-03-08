// pages/homeworkDetail.js
const { request } = require('../../utils/request')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    text: '',
    deadline: ''
  },

  onLoad: function (options) {
    this.setData({
      title: options.title,
      text: options.text,
      deadline: options.deadline
    })
  }
})