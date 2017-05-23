

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.request({
      url: 'https://561job.cn/user/query',
      data: app.globalData.openId,
      method: "GET",
      success: function (res) {
        if ("1" == res.level) {//个人用户
          wx.redirectTo({
            url: '',
          })
        } else {//企业用户
          wx.redirectTo({
            url: '',
          })
        }
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },


  //以下为自定义点击事件
  toNext: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    if (id == '2') {//个人用户
      wx.redirectTo({
        url: '../applicant/applicant?id=' + id
      })
    } else {
      wx.redirectTo({//企业用户
        url: '../position/position?id=' + id
      })
    }
  }
})

