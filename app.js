const regeneratorRuntime = require('./libs/regenerator-runtime/runtime')
const { request } = require('./utils/request')
const { toast } = require('./utils/toast')

// app.js
App({
  // 发送 res.code 到后台换取 openId, sessionKey, unionId
  getOpenId(appid, code, secret) {
    return request({
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
      method: 'get',
    })
      .then((data) => {
        const { openid, session_key: sessionKey } = data

        this.globalData.openId = openid
        this.globalData.sessionKey = sessionKey
        return openid
      })
      .catch((err) => {
        console.log(err)
        toast('获取信息失败')
      })
  },
  // 获取用户信息
  getName(openId) {
    request({
      pathName: '/findUser',
      method: 'get',
      data: { userId: openId },
    })
      .then((res) => {
        if (res.status === 200) {
          const { name: nickName, portrait: avatarUrl } = res.data
          wx.setStorage({
            key: 'portrait',
            data: avatarUrl,
          });
          wx.setStorage({
            key: 'name',
            data: nickName,
          });
          this.globalData.userInfo = {
            nickName,
            avatarUrl,
          }
        }
      })
      .catch((err) => {
        console.log(err)
        toast()
      })
  },

  onLaunch() {
    // 登录
    wx.login({
      success: async (res) => {
        const { appid, secret } = this.globalData

        const openId = await this.getOpenId(appid, res.code, secret)
        this.getName(openId)
      },
    })

    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      },
      fail: (err) => {
        console.log(err)
      },
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    sessionKey: null,
    appid: 'wx5ce885951fb4c321',
    secret: 'e7be92a220357a73af37d7f7b847f841',
  },
})
