Component({
  // 在组件定义时的选项中启用多slot支持
  options: { multipleSlots: true },
  properties: {
    list: {
      type: Array,
      value: [],
    },
  },
  methods: {
    gotoResource(e) {
      const { boxid } = e.currentTarget.dataset
      wx.navigateTo({
        url: `../../pages/sources/index?boxId=${boxid}`,
      })
    },
  },
})
