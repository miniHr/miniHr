// pages/job/jobDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobDetail: {},
    company: {},
    boothId: null,
    jobId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var source = options.fromJob || null;
    if (null != source) {
      var info = JSON.parse(options.fromJob);
      var com = { image: info.image, companyName: info.companyName };
      this.setData({
        boothId: info.boothId,
        jobDetail: info,
        company: com,
        jobId: info.id
      })
    } else {
      var job = JSON.parse(options.job);
      var company = JSON.parse(options.company);
      this.setData({
        boothId: options.boothId,
        jobDetail: job,
        company: company,
        jobId: options.jobId
      })
    }
  },

  fillResume: function () {
    wx.navigateTo({
      url: '../applicant/fill?boothId=' + this.data.boothId + '&jobId=' + this.data.jobId
    })
  }
})