// components/boxContentNav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗列表文字
    textContent: {
      type: String,
      value: '',
    },
  },
  methods: {
    click() {
      this.triggerEvent('clickListen')
    },
  },
})
