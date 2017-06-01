

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "enterpriseInfo",
  /**
   * 页面的初始数据
   */

  data: {
    
  
  
  },

  //以下为自定义点击事件
  toPay:function(){
    wx.navigateTo({
      url: '../pay/pay',
    })
  }
})

