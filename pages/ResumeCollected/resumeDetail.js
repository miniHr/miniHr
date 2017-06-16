// pages/ResumeCollected/resumeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stores:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://561job.cn/resume/query',
      data: {
        openId: wx.getStorageSync('openId'),
        level: 2,
        state: 2
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
            stores: res.data.retData.listInfos
          })
        }
      }
    })
  },

  callPhone: function (event) {
    var phone = event.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  toBack:function(){
    wx.navigateBack({
      
    })
  }
})