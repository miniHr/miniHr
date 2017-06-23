// pages/enter/enter.js
Page({
  toNext: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    if (id == '2') {//个人用户
      wx.redirectTo({
        url: '../applicant/applicant?id=' + id
      })
    } else {
      wx.redirectTo({//企业用户
        url: '../enterpriseInfo/enterpriseInfo?id=' + 1 + '&amount=' + 1
      })
    }
  }
})