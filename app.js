App({
  globalData: {
    appid: "wxe79c9076ceb26a59",
    secret: "f9d46de2cbf0c637d67510ccee67d218",
  },
  getUserInformation: function () {
    var that = this
    var openid = wx.getStorageSync('openId') || null;
    var info = wx.getStorageSync('userInfo') || null;
    if (!(openid != null && info != null)) {
      wx.login({//登陆接口
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (response) {
                wx.setStorageSync('userInfo', response.userInfo);
                var d = that.globalData;
                var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                wx.request({
                  url: l,
                  method: 'GET',
                  success: function (res) {
                    wx.setStorageSync('openId', res.data.openid);
                    wx.setStorageSync('sessionKey', res.data.session_key);
                  }
                });
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
                                  var d = that.globalData;
                                  var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                                  wx.request({
                                    url: l,
                                    method: 'GET',
                                    success: function (res) {
                                      wx.setStorageSync('openId', res.data.openid);
                                      wx.setStorageSync('sessionKey', res.data.session_key);
                                    }
                                  });
                                },
                              })
                            }
                          }
                        }
                      })
                    }
                  }
                })
              }
            });
          }
        }
      })
    }
  }
})