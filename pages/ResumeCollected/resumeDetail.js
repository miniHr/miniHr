// pages/ResumeCollected/resumeDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  callPhone: function (event) {
    var phone = event.currentTarget.id;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})