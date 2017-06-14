

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  toResumeDetail:function(){
    wx.navigateTo({
      url: 'resumeDetail',
    })
  }
})

