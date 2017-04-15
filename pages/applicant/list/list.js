// pages/applicant/list/list.js
Page({
  data:{
    typeOfJobs:[
      {"id":"type1","name":"普工","right":0},
      {"id":"type2","name":"文职","right":0},
      {"id":"type3","name":"人事行政","right":0},
      {"id":"type4","name":"会计","right":0},
      {"id":"type5","name":"服务类","right":0},
      {"id":"type6","name":"策划设计","right":0},
      {"id":"type7","name":"销售","right":0},
      {"id":"type8","name":"技工","right":0},
      {"id":"type9","name":"管理","right":0},
      {"id":"type10","name":"其他","right":0},
    ],
    tab:['','',' hide',' hide',' hide',' hide','','','',''],
    isImage:['show','show','hide','hide','hide','hide','show','show','show','show'],
    hidden:true,
    imageSrc:"/images/arrow1.png"
  },
  reachToDetails:function(e){
    var that=this;
    var id=e.currentTarget.id;
    var tab=this.data.tab;
    if('type2'==id){
      if(tab[2]==' hide'){
      this.setData({
                    tab:['','','','','','','','','',''],
                    imageSrc:"/images/arrow2.png"    
                });
      }else{
         this.setData({
                    tab:['','',' hide',' hide',' hide',' hide','','','',''],
                    imageSrc:"/images/arrow1.png"
                });
         
      }
    }else{
      id=id.substring(4);
      var item=id=='3'||id=='4'||id=='5'||id=='6'?'2':id;
      wx.request({
        url: 'https://561job.cn/insert/'+item,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function(res){
          if(200!=res.statusCode){
          that.setData({
            hidden:false
          });
          }else{
          wx.navigateTo({
            url: '../detail/detail?jobType='+id
          })
        }
        },
        fail: function() {
          that.setData({
            hidden:false
          });
        }
      })
    }
  },
  confirm:function(){
    this.setData({
      hidden:true
    })
  }
})