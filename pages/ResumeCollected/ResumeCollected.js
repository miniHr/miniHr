

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({

  data:{},

  onLoad:function(){
    wx.request({
      url: 'http:',
    })
  },

  toResumeDetail:function(){
    wx.navigateTo({
      url: 'resumeDetail',
    })
  }
})

