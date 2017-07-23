

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
            content: '出了点小差错！',
            showCancel:false
          })
        } else {
          that.setData({
            resumes: res1.data.retData.listInfos,
            resume: res1.data.retData.listInfos[0]
          })
        }
      }
    })
  },

  onPullDownRefresh: function () {
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
            content: '出了点小差错！',
            showCancel: false
          })
        } else {
          that.setData({
            resumes: res1.data.retData.listInfos,
            resume: res1.data.retData.listInfos[0],
            resumesIndex: 0
          })
        }
      }
    })
    wx.stopPullDownRefresh();
  },

  save: function () {
    var that = this;
    var ind2 = that.data.resumesIndex;
    var r = that.data.resumes;
    if (ind2 >= r.length) {
      wx.showModal({
        title: '提示',
        content: '没有更多的简历！',
        showCancel: false
      })
    } else {
      var ind = that.data.resume.id;
      wx.request({
        url: 'https://561job.cn/resume/save',
        data: {
          id: ind
        },
        method: 'GET',
        success: function (response) {
          if ('01' == response.data.retCode) {
            wx.showModal({
              title: '意外',
              content: '出了点小差错！',
              showCancel: false
            })
          } else {
            that.setData({
              resumesIndex: ind2 + 1,
              resume: r[ind2 + 1]
            })
            wx.showModal({
              title: '提示',
              content: '操作成功！',
              showCancel: false
            })
          }
        }
      })
    }
  },

  deleteResume: function () {
    var that = this;
    var ind2 = that.data.resumesIndex;
    var r = that.data.resumes;
    if (ind2 >= r.length) {
      wx.showModal({
        title: '提示',
        content: '没有更多的简历！',
        showCancel: false
      })
    } else {
      var ind = that.data.resume.id;
      wx.request({
        url: 'https://561job.cn/resume/delete',
        data: {
          id: ind
        },
        method: 'GET',
        success: function (response) {
          if ('01' == response.data.retCode) {
            wx.showModal({
              title: '意外',
              content: '出了点小差错！',
              showCancel: false
            })
          } else {
            var r = that.data.resumes;
            that.setData({
              resumesIndex: ind2 + 1,
              resume: r[ind2 + 1]
            })
            wx.showModal({
              title: '提示',
              content: '操作成功！',
              showCancel: false
            })
          }
        }
      })
    }
  },

  toResumeDetail: function () {
    wx.navigateTo({
      url: 'resumeDetail',
    })
  }
})

