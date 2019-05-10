// pages/homeworkDetail.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    text: '',
    deadline: '',
  },

  onLoad(options) {
    this.setData({
      title: options.title,
      text: options.text,
      deadline: options.deadline,
    })
  },
})
