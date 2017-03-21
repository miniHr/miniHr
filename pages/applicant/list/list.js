// pages/applicant/list/list.js
Page({
  data:{
    typeOfJobs:[
      {"id":"type1","name":"普工","right":0},
      {"id":"type2","name":"文职","right":0},
      {"id":"admin","name":"人事","right":0},
      {"id":"clerk","name":"行政","right":0},
      {"id":"service","name":"客服","right":0},
      {"id":"type3","name":"销售","right":0},
      {"id":"type4","name":"技工","right":0},
      {"id":"type5","name":"其他","right":0},
    ],
    tab:['','',' hide',' hide',' hide','','',''],
    isImage:['show','show','hide','hide','hide','show','show','show'],
    rotation:['','','','','','','',''],
    colors:['#F8F8FF','#F8F8FF','#87CEFA','#5F9EA0','#00FFFF','#F8F8FF','#F8F8FF','#F8F8FF']
  },
  reachToDetails:function(e){
    var id=e.currentTarget.id;
    var tab=this.data.tab;
    if('type2'==id){
      if(tab[2]==' hide'){
      this.setData({
                    tab:['','','','','','','',''],
                rotation:['','yes','','','','','','']    
                });
      }else{
         this.setData({
                    tab:['','',' hide',' hide',' hide','','',''],
                    rotation:['','','','','','','','']
                });
      }
    }else{
      wx.navigateTo({
        url: '../detail/detail'
      })
    }
  }
})