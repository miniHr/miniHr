// pages/applicant/resume.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resume: null,
    sex: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userInfo = JSON.parse(wx.getStorageSync('jsonPerson'));
    var sex = userInfo.sex == 0 ? '男' : '女';
    that.setData({
      resume: userInfo,
      sex:sex
    })
  },
})