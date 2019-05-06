function toast(title = '登录失败', icon = 'none', duration = 500) {
  wx.showToast({
    title,
    icon,
    duration
  })
}

module.exports = { toast }
