

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({

  data: {
    resumes: [],
    resumesIndex: 0,
    resume: null
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://561job.cn/resume/query',
      data: {
        openId: wx.getStorageSync('openId'),
        level: 2,
        state: 1
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
            resumes: res.data.retData.listInfos,
            resume: res.data.retData.listInfos[0]
          })
        }
      }
    })
  },

  save:function(){

  },

  toResumeDetail: function () {
    wx.navigateTo({
      url: 'resumeDetail',
    })
  }
})

