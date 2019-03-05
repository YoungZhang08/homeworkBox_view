const request = ({ data, method, url = 'http://127.0.0.1:8000/homework', pathName, header }) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${url}${pathName}`,
      data,
      method,
      header,
      dataType: 'json',
      success: res => {
        if ((res.statusCode === 200 && !res.data.status) || (200 <= res.data.status && 300 > res.data.status)) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = { request }
