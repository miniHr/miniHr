

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  onLoad() {
    this.getUserInformation();
  },

  getUserInformation: function () {
    var that = this
    var openid = wx.getStorageSync('openId') || null;
    var info = wx.getStorageSync('userInfo') || null;
    if ((openid != null)) {
      that.goToNextPage();
    } else {
      wx.login({
        success: function (response) {
          if (response.code) {
            var code = response.code;
            wx.getUserInfo({
              success: function (resp) {
                wx.setStorageSync('userInfo', resp.userInfo);
                var d = app.globalData;
                var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + code + '&grant_type=authorization_code';
                wx.request({
                  url: l,
                  method: "GET",
                  success: function (res) {
                    wx.setStorageSync('openId', res.data.openid);
                    wx.setStorageSync('sessionKey', res.data.session_key);
                    that.goToNextPage();
                  }
                })
              },
              fail: function () {
                wx.showModal({
                  title: '警告',
                  content: '您点击了拒绝授权，将无法正常使用。重新点击授权则可以重新使用，或者删除小程序重新进入。',
                  confirmText: '授权',
                  cancelText: '不授权',
                  success: function (isAuth) {
                    if (isAuth.confirm) {
                      wx.openSetting({
                        success: function (data) {
                          if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                              wx.getUserInfo({
                                success: function (response) {
                                  wx.setStorageSync('userInfo', response.userInfo);
                                  var d = app.globalData;
                                  var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + code + '&grant_type=authorization_code';
                                  wx.request({
                                    url: l,
                                    method: 'GET',
                                    success: function (res) {
                                      wx.setStorageSync('openId', res.data.openid);
                                      wx.setStorageSync('sessionKey', res.data.session_key);
                                      that.goToNextPage();
                                    }
                                  });
                                }
                              })
                            }
                          }
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        }
      })
    }
  },

  goToNextPage: function () {
    var level = app.globalData.level;
    if (level != null) {
      if (level == '1') {//个人用户
        wx.redirectTo({
          url: '../job/job?level=' + level
        })
      } else if (level == '2') {//已付费企业用户
        wx.redirectTo({
          url: '../ResumeCollected/ResumeCollected',
        })
      } else {//未付费企业用户
        wx.redirectTo({
          url: '../position/position',
        })
      }
    } else {
      wx.request({
        url: 'https://561job.cn/user/query',
        data: {
          openId: wx.getStorageSync('openId')
        },
        method: "GET",
        success: function (res) {
          if (res.data.retCode == '01') {
            wx.redirectTo({
              url: '../enter/enter',
            })
          } else {
            app.globalData.companyId = res.data.retData.companyId;
            app.globalData.level = res.data.retData.level;
            if (res.data.retData.level == '1') {
              var jsonPerson = JSON.stringify(res.data.retData);
              wx.setStorageSync('jsonPerson', jsonPerson);
              wx.redirectTo({
                url: '../applicant/pass?jsonPerson=' + jsonPerson +'&isInsert=no'
              })
            } else if (res.data.retData.level == '2') {
              wx.redirectTo({
                url: '../ResumeCollected/ResumeCollected'
              })
            } else {
              wx.redirectTo({
                url: '../position/position'
              })
            }
          }
        }
      })
    }
  }
})