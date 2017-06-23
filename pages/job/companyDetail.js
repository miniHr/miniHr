// pages/job/companyDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyDetail: {},
    jobs: [],
    boothId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var comId = options.keyId;
    wx.request({
      url: 'https://561job.cn/company/query',
      data: {
        id: comId
      },
      method: 'GET',
      success: function (res1) {
        if ('01' == res1.data.retCode) {
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
          })
        } else {
          that.setData({
            companyDetail: res1.data.retData,
            boothId: res1.data.retData.boothId,
            jobs: res1.data.retDataTwo
          })
        }
      }
    })
  },

  seeMore: function (e) {
    var jobId = e.currentTarget.dataset.jobid;
    var jobd = this.data.jobs[e.currentTarget.id];
    var job = JSON.stringify(jobd);
    var company = JSON.stringify(this.data.companyDetail);
    wx.navigateTo({
      url: 'jobDetail?job=' + job + '&jobId=' + jobId + '&company=' + company + '&boothId=' + this.data.boothId
    })
  }
})