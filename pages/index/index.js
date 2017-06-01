

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
    wx.request({
      url: 'https://561job.cn/user/query',
      data: {
        openId: wx.getStorageSync('openId')
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data==''){
            wx.redirectTo({
              url: '../enter/enter'
            })
          } else {
            if ("1" == res.data.level) {//个人用户
              wx.redirectTo({
                url: '../job/job'
              })
            } else{//企业用户
              wx.redirectTo({
                url: '../ResumeCollected/ResumeCollected'
              })
            }
          }
        } else {
          wx.showModal({
            title: '意外',
            content: '出了点小差错！'
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
  }
})