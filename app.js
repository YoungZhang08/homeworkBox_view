//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        const { code } = res
        const { appid, secret } = this.globalData
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
          header: {
            'content-type': 'json'
          },
          success: res => {
            console.log(res)
            const { openid, session_key } = res.data
            this.globalData.openId = openid
            this.globalData.sessionKey = session_key
            wx.request({
              url: `http://127.0.0.1:8000/homework/addUser`,
              data: {
                userId: openid,
              },
              method: 'POST',
              dataType: 'json',
              success: res => {
                console.log(res)
                const { data } = res
                if (data.status === 200) {
                  this.globalData.userInfo = {

                  }
                }
              },
              fail: err => {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 500,
                })
              }
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    sessionKey: null,
    appid: 'wx5ce885951fb4c321',
    secret: 'e7be92a220357a73af37d7f7b847f841',
  }
})