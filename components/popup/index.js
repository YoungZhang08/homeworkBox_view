Component({

  // 在组件定义时的选项中启用多slot支持
  options: { multipleSlots: true },

  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗列表文字
    btnTop: {
      type: String,
      value: ''
    },
    // 弹窗列表文字
    btnBottom: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: { flag: true },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏弹框
    hidePopup: function () {
      this.setData({ flag: !this.data.flag })
    },
    // 展示弹框
    showPopup() {
      this.setData({ flag: !this.data.flag })
    }
  }
})
