// pages/applicant/pass.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isInsert: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = JSON.parse(options.jsonPerson);
    that.setData({
      userInfo: user,
      isInsert: options.isInsert
    })
  },

  onReady: function () {
    var that = this;
    if ('yes' == that.data.isInsert) {
      wx.request({
        url: 'https://561job.cn/user/insert',
        data: {
          openId: that.data.userInfo.openId,
          name: that.data.userInfo.name,
          phone: that.data.userInfo.phone,
          sex: that.data.userInfo.sex,
          age: that.data.userInfo.age,
          industry: that.data.userInfo.industry,
          workTime: that.data.userInfo.workTime,
          education: that.data.userInfo.education,
          major: that.data.userInfo.major
        },
        method: 'GET',
        success: function (res1) {
          if ('01' == res1.data.retCode) {
            wx.showModal({
              title: '意外',
              content: '出了点小差错！',
              showCancel: false
            })
          } else {
            app.globalData.level = res1.data.retData.level;
            var jsonPerson = JSON.stringify(res1.data.retData);
            wx.setStorageSync('jsonPerson', jsonPerson);
          }
        }
      })
    }
  },

  toGetCompanyList:function(e){
    wx.navigateTo({
      url: 'companyList'
    })
  },

  toGetRecommend: function (e) {
    wx.navigateTo({
      url: '../job/job?level=1'
    })
  },

  toModify: function (e) {
    wx.navigateTo({
      url: 'modifyResume'
    })
  }
})