Component({
  // 在组件定义时的选项中启用多slot支持
  options: { multipleSlots: true },
  properties: {
    list: {
      type: Array,
      value: [],
    },
    fromWhere: {
      type: String,
      value: '',
    }
  },
  ready() {
    console.log(this.properties.fromWhere)
  }
})
