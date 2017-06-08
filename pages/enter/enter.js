// pages/enter/enter.js
Page({
  toNext: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    if (id == '2') {//个人用户
      // wx.redirectTo({
      //   url: '../applicant/applicant?id=' + id
      // })
      wx.showModal({
        title: '温馨提示',
        content: '此功能暂不开放',
        showCancel:false
      })
    } else {
      wx.redirectTo({//企业用户
        url: '../position/position?id=' + id
      })
    }
  }
})