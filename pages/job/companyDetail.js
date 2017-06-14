// pages/job/companyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var comId = options.keyId;
    wx.request({
      url: 'https://561job.cn/company/query',
      data: {
        id: comId
      },
      method: 'GET',
      success: function (res1) {
        if ('01' == res1.data.retCode) {
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
          })
        } else {
          that.setData({
            companyDetail: res1.data.retData
          })
        }
      }
    })
  },

  seeMore: function () {
    wx.navigateTo({
      url: 'jobDetail',
    })
  }
})