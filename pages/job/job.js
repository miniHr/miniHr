

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
    recommends: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    var that = this;
    that.getRecommendJobs();
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
      success: function (res1) {
        if ('01' == res1.data.retCode) {
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
          })
        } else {
          that.setData({
            recommends: res1.data.retData.listInfos
          })
        }
      }
    })
  },
  toJobDetail: function (e) {
    var jobd = this.data.recommends[e.currentTarget.id];
    var job2 = JSON.stringify(jobd);
    wx.navigateTo({
      url: 'jobDetail?fromJob=' + job2
    })
  }
})

