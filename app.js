App({
  globalData: {
    appid: "wxe79c9076ceb26a59",
    secret: "f9d46de2cbf0c637d67510ccee67d218",
    userInfo: null,
    sessionKey: null,
    openId: null
  },
  onLaunch() {
    var that = this
    var user = wx.getStorageSync('user') || {};
    var info = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!info.nickName)) {
      wx.login({//登陆接口
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (response) {
                wx.setStorageSync('userInfo', response.userInfo);
                that.globalData.userInfo = response.userInfo;
              }
            });
            var d = that.globalData;
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              method: 'GET',
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                wx.setStorageSync('user', obj);
                that.globalData.openId = res.data.openid;
                that.globalData.sessionKey = res.data.session_key;
              }
            });
          } 
        }
      })
    }
  }
})