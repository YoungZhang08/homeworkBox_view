const request = ({ data, method, url, header }, cb) => {
  wx.request({
    url: `http://127.0.0.1:8000/homework${url}`,
    data,
    method,
    header,
    dataType: 'json',
    success: res => {
      if (200 <= res.data.status && 300 > res.data.status) {
        cb(true, res.data)
      } else {
        cb(false, res.data)
      }
    },
    fail: err => {
      cb(false, err)
    }
  })
}

module.exports = { request }
