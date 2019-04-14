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
      // console.log(e.currentTarget.dataset)
      const boxId = e.currentTarget.dataset.boxId
      wx.navigateTo({
        url: `../../pages/sources/index?boxId=${boxId}`,
      });
    }
  },
})
