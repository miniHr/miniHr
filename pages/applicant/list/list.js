// pages/applicant/list/list.js
Page({
  data:{
    typeOfJobs:[
      {"id":"type1","name":"普工","right":0},
      {"id":"type2","name":"文职","right":0},
      {"id":"type3","name":"销售","right":0},
      {"id":"type4","name":"技工","right":0},
      {"id":"type5","name":"其他","right":0},
    ],
    typeOfOffices:[
      {"name":"人事"},
      {"name":"行政"},
      {"name":"客服"}
    ],
    tab:[true,true,true,true,true]
  },
  reachToDetails:function(e){
    var id=e.currentTarget.id;
    var tab=this.data.tab;
    if('type2'==id){
      if(tab[1]==true){
      this.setData({
                    tab:[true,false,true,true,true],
                });
      }else{
         this.setData({
                    tab:[true,true,true,true,true],
                });
      }
    }else{
      wx.navigateTo({
        url: '../detail/detail'
      })
    }
  }
})