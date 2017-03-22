// pages/applicant/detail/detail.js
Page({
  data:{
    hidden:true,
    jobInfo:[]
  },
  onPullDownRefresh:function(){
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
            jobInfo:res.data
          })
        }
      }
    })
  },
  confirm:function(){
    this.setData({
      hidden:true
    })
  }
})