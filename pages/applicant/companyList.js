// pages/applicant/companyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList: null
  },


  onReady: function () {
    var that = this;
    wx.request({
      url: 'https://561job.cn/company/query/limit',
      data: {
        limit: 0
      },
      method: 'GET',
      success: function (res1) {
        that.setData({
          companyList: res1.data
        })
      }
    })
  },
})