// pages/enterprise/detail/detail.js
Page({
  data:{
    names:['普工','文职','销售','技工','其他'],
    result:[],
    hidden:true
  },
  onLoad:function(options){
      var that=this;
      wx.request({
        url: 'https://561job.cn/count',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          if(200!=res.statusCode){
          that.setData({
            hidden:false
          });
        }else{
          that.setData({
            result:res.data
          })
        }
        },
        fail: function() {
          that.setData({
            hidden:false
          });
        }
      })
  },
  onPullDownRefresh:function(){
     var that=this;
      wx.request({
        url: 'https://561job.cn/count',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          if(200!=res.statusCode){
          wx.stopPullDownRefresh();
          that.setData({
            hidden:false
          });
        }else{
          that.setData({
            result:res.data
          })
          wx.stopPullDownRefresh();
        }
        },
        fail: function() {
          wx.stopPullDownRefresh();
          that.setData({
            hidden:false
          });
        }
      })
  },

  confirm:function(){
    this.setData({
      hidden:true
    })
  }
})