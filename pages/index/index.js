

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
    app.getUserInformation();
    wx.request({
      url: 'https://561job.cn/user/query',
      data: wx.getStorageSync('openId'),
      method: "GET",
      success: function (res) {
        if ("1" == res.level) {//个人用户
          wx.redirectTo({
            url: '../applicant/applicant',
          })
        } else {//企业用户
          wx.redirectTo({
            url: '../ResumeCollected/ResumeCollected',
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '意外',
          content: '出了点小差错！'
        })
      }
    })
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

