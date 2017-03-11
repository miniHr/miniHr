// pages/applicant/applicant.js
Page({
  data:{
    typesOfJobs:[
      {"id":"type1","name":"普工","right":0},
      {"id":"type2","name":"文职","right":0},
      {"id":"type3","name":"销售","right":0},
      {"id":"type4","name":"技工","right":0},
      {"id":"type5","name":"其他","right":0},
    ]
  },
  reachToDetails:function(e){
    var id=e.currentTarget.id;
    if('type2'==id){
      
    }else{
      wx.navigateTo({
        url: '../applicant/detail/detail'
      })
    }
  }
})