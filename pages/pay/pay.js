

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "pay",
  /**
   * 页面的初始数据
   */

  data: {
    boothId: '',
    companyId: '',
    amount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    that.setData({
      boothId: option.boothId,
      companyId: option.companyId,
      amount: option.amt
    });
  },

  //以下为自定义点击事件
  toWxpayment: function () {
    var that = this;
    wx.request({
      url: 'https://561job.cn/booth/pay',
      data: {
        openId: wx.getStorageSync('openId'),
        boothId: that.data.boothId,
        companyId: that.data.companyId,
        amount: that.data.amount
      },
      method: 'GET',
      success: function (res) {
        if ('00' == res.data.retCode) {
          console.log(res);
          wx.requestPayment({
            timeStamp: res.data.retData.redirectParamsMap.timeStamp,
            nonceStr: res.data.retData.redirectParamsMap.nonceStr,
            package: res.data.retData.redirectParamsMap.package,
            signType: res.data.retData.redirectParamsMap.signType,
            paySign: res.data.retData.redirectParamsMap.paySign
          })
        }else{
          wx.showModal({
            title: '意外',
            content: res.data.retData
          })
        }
      }
    })
  }
})