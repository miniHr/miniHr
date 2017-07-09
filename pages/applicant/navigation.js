// pages/applicant/navigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      jobId: options.jobId,
      boothId: options.boothId
    })
  },

  onReady: function (e) {
    var that = this;
    wx.request({
      url: 'https://561job.cn/resume/insert',
      data: {
        openId: wx.getStorageSync('openId'),
        jobId: that.data.jobId
      },
      success: function (res1) {
        if ('01' == res1.data.retCode) {
          wx.showModal({
            title: '错误',
            content: res1.data.retData
          })
        }
      }
    })
  },

  preResume: function () {
    wx.redirectTo({
      url: 'resume',
    })
  }
})