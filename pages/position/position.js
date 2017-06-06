

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
    seats1: [1, 2, 3, 4, 5, 6, 7, 8],
    seats2: [],
    seats3: [],
    seats4: [],
    seats5: [],
    seats6: [93, 94, 95, 96, 97, 98, 99, 100],
    seatsInfo: [],
    boothId: null,
    change: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this;
    that.getAllSeats();
    var seats2 = that.data.seats2;
    var seats3 = that.data.seats3;
    var seats4 = that.data.seats4;
    var seats5 = that.data.seats5;
    for (var i = 9; i < 93; i++) {
      if (i >= 30 && i <= 50) {
        seats3.push(i);
      } else if (i >= 51 && i <= 71) {
        seats4.push(i);
      } else if (i >= 72 && i <= 92) {
        seats5.push(i);
      } else {
        seats2.push(i);
      }
    }
    that.setData({
      seats2: seats2,
      seats3: seats3,
      seats4: seats4,
      seats5: seats5
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  setToBuy: function (e) {
    var that = this;
    var id = e.currentTarget.id;
    id = id.substring(4);
    var colors = that.data.change;
    if (colors[id - 1] == 'bought'){
      return;
    }
    var preId = that.data.boothId;//先前点击的展位号
    if (preId != null && colors[preId - 1] != 'bought') {
      colors[preId - 1] = '';
    }
    if (colors[id - 1] == '') {//只有是未购买才变色
      colors[id - 1] = 'buying';
    }
    that.setData({
      boothId:id,
      change:colors
    })
  },

  //以下为自定义点击事件
  confirmBuy: function () {
    var that = this;
    if (that.data.boothId == null) {
      wx.showModal({
        title: '提示',
        content: '请选择展位号！'
      })
    } else {
      var id = parseInt(that.data.boothId);
      if (that.data.seatsInfo[id - 1].state == 2 || that.data.seatsInfo[id - 1].state == 3) {
        wx.showModal({
          title: '提示',
          content: '此展位号已被购买，请重新选择！'
        })
      } else {
        var companyId=wx.getStorageSync('companyId')||null;
        var amt = that.data.seatsInfo[id - 1].price;
        if(companyId==null){
          wx.navigateTo({
            url: '../enterpriseInfo/enterpriseInfo?id=' + this.data.boothId + '&amount=' + amt
          })
        }else{
          wx.navigateTo({
            url: '../pay/pay?boothId=' + that.data.boothId + '&companyId=' + companyId + '&amt=' + amt
          })
        }
      }
    }
  },

  getAllSeats: function () {
    var that = this;
    wx.request({
      url: 'https://561job.cn/booth/query',
      method: 'GET',
      success: function (res) {
        if (res.data.retCode == '00') {
          var changeColor = new Array(10);
          var info = res.data.retData;
          for (var i = 0; i < info.length; i++) {
            if ('1' == info[i].state) {
              changeColor[i] = '';
            } else {
              changeColor[i] = 'bought';
            }
          }
          that.setData({
            seatsInfo: res.data.retData,
            change: changeColor
          })

        } else {
          wx.showModal({
            title: '意外',
            content: '出了点差错！'
          })
        }
      }
    })
  }
})

