

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "position",
  /**
   * 页面的初始数据
   */

  data: {
    seats1:[1,2,3,4,5,6,7,8],
    seats2:[],
    seats5:[93,94,95,96,97,98,99,100]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var that=this;
    var seats2=that.data.seats2;
    for(var i=0;i<21;i++){
      seats2[i]=i+1;
    }
    that.setData({
      seats2:seats2
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  confirmBuy:function(){
    wx.navigateTo({
      url: '../enterpriseInfo/enterpriseInfo?id=1'
    })
  }
})

