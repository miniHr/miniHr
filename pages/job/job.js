

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "job",
  /**
   * 页面的初始数据
   */

  data: {
    recommend: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    var that=this;
    wx.request({//新增个人用户
      url: 'https://561job.cn/user/insert',
      data: {
        sex: option.sex,
        age: option.age,
        industry: option.industry,
        workTime: option.workTime,
        education: option.education,
        major: option.major
      },
      method: 'GET',
      success: function (res1) {
        if('01'==res.data.retCode){
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
          })
        }else{
            wx.request({
              url: 'https://561job.cn/job/recommend',
              data:{
                openId: wx.getStorageSync('openId')
              },
              method: 'GET',
              success:function(res2){
                if ('01' == res.data.retCode){
                  wx.showModal({
                    title: '意外',
                    content: '出了点小差错！'
                  })
                }else{
                  that.setData({
                    recommend:res2.data.retData
                  })
                }
              }
            })
        }
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件
  toDetail: function () {
    wx.navigateTo({
      url: 'companyDetail',
    })
  }
})

