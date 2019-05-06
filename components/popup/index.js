Component({
  // 在组件定义时的选项中启用多slot支持
  options: { multipleSlots: true },

  /**
   * 组件的属性列表
   */
  properties: {
    textContent: {
      type: Array,
      value: [],
    },
    urlList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: { flag: true },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(e) {
      const { url } = e.currentTarget.dataset
      this.hidePopup()
      wx.navigateTo({ url })
    },
    // 隐藏弹框
    hidePopup() {
      this.setData({ flag: !this.data.flag })
    },
    // 展示弹框
    showPopup() {
      this.setData({ flag: !this.data.flag })
    },
  },
})
