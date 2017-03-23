// pages/applicant/detail/detail.js
Page({
  data:{
    hidden:true,
    jobInfo:[],
    jobType:"1"
  },
  onPullDownRefresh:function(){
     var that=this;
    wx.request({
      url: 'https://561job.cn/'+this.data.jobType,
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
            jobInfo:res.data,
          })
        }
      }
    })
    wx.stopPullDownRefresh();
  },
  onLoad:function(options){
    var that=this;
    var jobType=options.jobType;
    wx.request({
      url: 'https://561job.cn/query/'+jobType,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        if(200!=res.statusCode){
          that.setData({
            hidden:false
          });
        }else{
          that.setData({
            jobInfo:res.data,
            jobType:jobType
          })
        }
      },
      fail:function(){
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