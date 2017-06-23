// pages/applicant/navigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booth: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      booth: options.boothId
    })
    wx.request({
      url: 'https://561job.cn/user/update',
      data: {
        openId: wx.getStorageSync('openId'),
        name: options.name,
        phone: options.phone
      },
      method: 'GET',
      success: function (res) {
        if ('01' == res.data.retCode) {
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
          })
        } else {
          wx.request({
            url: 'https://561job.cn/resume/insert',
            data: {
              openId: wx.getStorageSync('openId'),
              jobId: options.jobId
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