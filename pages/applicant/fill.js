// pages/applicant/fill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boothId: null,
    confirm: false,
    name: null,
    phone: null,
    jobId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      boothId: options.boothId,
      jobId: options.jobId
    })
  },

  checkName: function (e) {
    var str = e.detail.value;
    if (str.length < 1) {
      this.setData({
        confirm: false
      })
      wx.showModal({
        title: '错误',
        content: '请填写姓名',
      })
    } else {
      this.setData({
        confirm: true,
        name: str
      })
    }
  },

  checkPhone: function (e) {
    var str = e.detail.value;
    if (!(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(str))) {
      this.setData({
        confirm: false
      })
      wx.showModal({
        title: '错误',
        content: '请填写正确的手机号码',
      })
    } else {
      this.setData({
        confirm: true,
        phone: null
      })
    }
  },

  sendToHr: function () {
    var that = this;
    var canFirm = that.data.confirm;
    if (!canFirm) {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整或正确',
        showCancel: false
      })
    } else {
      wx.redirectTo({
        url: 'navigation?name=' + this.data.name + '&phone=' + this.data.phone + '&boothId=' + this.data.boothId + '&jobId=' + this.data.jobId
      })
    }
  }
})