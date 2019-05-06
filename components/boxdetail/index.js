Component({
  // 在组件定义时的选项中启用多slot支持
  options: { multipleSlots: true },
  properties: {
    list: {
      type: Array,
      value: [],
    },
    isUsers: {
      type: Boolean,
    },
    isHomework: {
      type: Boolean,
    }
  },
  methods: {
    gotoHomework(e) {
      console.log(e.currentTarget.dataset)
      const { boxid, id } = e.currentTarget.dataset
      wx.navigateTo({
        url: '../../pages/homeworkDetail/index',
      });
    },
    gotoResources(e) {
      console.log(e.currentTarget.dataset)
      const { boxid, id } = e.currentTarget.dataset
      wx.navigateTo({
        // url: `../../pages/downloadResources/index?id=${id}&boxId=${boxid}`,
      });
    }
  }
})
