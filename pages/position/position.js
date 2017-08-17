

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
    seatsInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this;
    that.getAllSeats();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getAllSeats();
  },

  getAllSeats: function () {
    var that = this;
    wx.request({
      url: 'https://561job.cn/booth/query',
      method: 'GET',
      success: function (res) {
        if (res.data.retCode == '00') {
          var arr = res.data.retData;
          for (var i = 0; i < arr.length; i++) {
            var price = ((arr[i].price) * 0.01).toString();
            var reg = price.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
            price = price.replace(reg, '$1,');
            arr[i].price = price;
          }
          that.setData({
            seatsInfo: res.data.retData
          })
        } else {
          wx.showModal({
            title: '意外',
            content: '出了点差错！'
          })
        }
      }
    })
    wx.stopPullDownRefresh();
  },

  toBuy: function (e) {
    if (e.currentTarget.dataset.state == 1) {
      var companyId = app.globalData.companyId;
      var id = e.currentTarget.dataset.id;
      var amt = parseFloat(e.currentTarget.dataset.price);
      amt = amt * 100;
      if (companyId == null) {
        wx.navigateTo({
          url: '../enterpriseInfo/enterpriseInfo?id=' + id + '&amount=' + amt.toString()
        })
      } else {
        wx.showModal({
          title: '温馨提示',
          content: '您已经预定了一个展位，如需更改，请联络智诚工作人员。',
          showCancel:false
        })
      }
    }
  }
})

