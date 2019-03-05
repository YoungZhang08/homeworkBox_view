Component({

  // 在组件定义时的选项中启用多slot支持
  options: { multipleSlots: true },

  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    // 弹窗列表文字
    btnCreate: {
      type: String,
      value: '创建盒子'
    },
    // 弹窗列表文字
    btnAdd: {
      type: String,
      value: '加入盒子'
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
