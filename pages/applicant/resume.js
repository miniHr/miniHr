// pages/applicant/resume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resume: {},
    sex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://561job.cn//user/query',
      data: {
        openId: wx.getStorageSync('openId')
      },
      success: function (res) {
        if ('01' == res.data.retCode) {
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
          })
        } else {
          var sex = res.data.retData.sex == '0' ? '男' : '女';
          that.setData({
            resume: res.data.retData,
            sex: sex
          })
        }
      }
    })
  },
})