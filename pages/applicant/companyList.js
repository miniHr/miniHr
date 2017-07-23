// pages/applicant/companyList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList: null,
    page: 0,
    hasMore: true,
    isFresh:true
  },


  onReady: function () {
    var that = this;
    wx.request({
      url: 'https://561job.cn/company/query/limit',
      data: {
        limit: 0
      },
      method: 'GET',
      success: function (res1) {
        var page = that.data.page;
        page = page + 8;
        that.setData({
          companyList: res1.data,
          page: page
        })
      }
    })
  },

  searchScrollLower: function (e) {
    var that = this;
    if (that.data.hasMore&&that.data.isFresh) {
      that.setData({
        isFresh:false
      })
      wx.showLoading({
        title: '玩命加载中……',
      })
      wx.request({
        url: 'https://561job.cn/company/query/limit',
        data: {
          limit: that.data.page
        },
        method: 'GET',
        success: function (res1) {
          wx.hideLoading();
          if (res1.data.length < 1) {
            that.setData({
              hasMore: false
            })
          } else {
            var page = that.data.page;
            page = page + 8;
            var list = that.data.companyList;
            for (var i = 0; i < res1.data.length; i++) {
              list.push(res1.data[i]);
            }
            that.setData({
              companyList:list,
              page: page,
              isFresh: true
            })
          }
        }
      })
    }
  },

  toCompanyDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/job/companyDetail?keyId=' + id
    })
  }
})