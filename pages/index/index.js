//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function(e) {
    var id=e.currentTarget.id;
    if(id=='applicant'){
      wx.navigateTo({
      url: '../applicant/list/list'
    })
    }else{
    wx.navigateTo({
      url: '../enterprise/detail/detail'
    })
    }
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
