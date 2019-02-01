const request = ({data, method, url, header}, cb) => {
  wx.request({
    url: `http://127.0.0.1:8000/homework${url}`,
    data,
    method,
    header,
    dataType: 'json',
    success: res => {
      const { data } = res
      if (data.status >= 200 && data.status < 300 ) {
        cb(true, data)
      } else {
        cb(false, data)
      }
    },
    fail: err => {
      cb(false, err)
    }
  })
}

module.exports = {
  request,
}