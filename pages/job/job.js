

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "job",
  /**
   * 页面的初始数据
   */

  data: {
    recommends: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    var that = this;
    var level = option.level || null;
    if (level != null) {
      that.getRecommendJobs();
    } else {
      wx.request({//新增个人用户
        url: 'https://561job.cn/user/insert',
        data: {
          openId: wx.getStorageSync('openId'),
          sex: option.sex,
          age: option.age,
          industry: option.industry,
          workTime: option.worktime,
          education: option.education,
          major: option.major
        },
        method: 'GET',
        success: function (res1) {
          if ('01' == res1.data.retCode) {
            wx.showModal({
              title: '意外',
              content: '出了点小差错！'
            })
          } else {
            app.globalData.level = res.data.retData.level;
            that.getRecommendJobs();
          }
        }
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件
  toCompanyDetail: function (e) {
    var key = e.currentTarget.id;
    wx.navigateTo({
      url: 'companyDetail?keyId=' + key
    })
  },

  getRecommendJobs: function () {
    var that = this;
    wx.request({
      url: 'https://561job.cn/job/recommend',
      data: {
        openId: wx.getStorageSync('openId')
      },
      method: 'GET',
      success: function (res2) {
        if ('01' == res.data.retCode) {
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
          })
        } else {
          that.setData({
            recommends: res2.data.retData
          })
        }
      }
    })
  }
})

