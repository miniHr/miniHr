// pages/applicant/detail/detail.js
Page({
  data:{},
  onPullDownRefresh:function(){
    wx.stopPullDownRefresh();
  },
  onLoad:function(options){
    wx.request({
      url: 'https://localhost:8080/hello',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log(res.data);
      }
    })
  }
})