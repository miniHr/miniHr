// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "enterpriseInfo",
  /**
   * 页面的初始数据
   */

  data: {
    boothId: ''
  },

  onLoad: function (option) {
    var that = this;
    that.setData({
      boothId: option.id
    });
  },

  insertCompany: function (e) {
    var that = this;
    var companyName = e.detail.value.input1;
    var companyPhone = e.detail.value.input2;
    if (companyName == '' || companyPhone == '') {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整',
        showCancel: false
      })
    } else {
      wx.request({
        url: 'https://561job.cn/company/insert',
        data: {
          openId: wx.getStorageSync('openId'),
          companyName: companyName,
          phone: companyPhone,
          boothId: that.data.boothId
        },
        method: 'GET',
        success: function (res) {
          if (res.data.retCode == '00') {
            var companyId = res.data.retData.keyID;
            wx.navigateTo({
              url: '../pay/pay?boothId=' + that.data.boothId + '&companyId=' + companyId
            })
          } else {
            wx.showModal({
              title: '意外',
              content: '出了点小差错！'
            })
          }
        }
      })
    }
  },

  showTip: function () {
    wx.showModal({
      title: '购买须知',
      content: '保险公司和无营业执照的公司购买后不提供展位,一家企业最多只能买两个展位',
      showCancel: false
    })
  },

  customService: function () {
    wx.makePhoneCall({
      phoneNumber: '13916210164'
    })
  }
})