const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    index: 0,
    industries: ["普工", "人事行政", "会计", "服务类", "策划设计", "销售", "技工", "管理", "其他"],
    educations: ["小学", "初中", "高中", "中专", "大专", "本科", "硕士"],
    expectAddres: ["淮北全市", "相山区", "杜集区", "烈山区", "濉溪县", "合肥", "芜湖", "宿州", "徐州/宿迁", "南京/苏州/无锡/常州/镇江", "杭州/宁波/温州", "珠三角"],
    expectAddr: "请点击选择期望工作地点",
    expectType: "请点击选择期望工作类型",
    correct1: true,
    correct2: true,
    correct3: true,
    correct4: true,
    correct5: true,
    sex: 0,
    nolocal: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var user = JSON.parse(wx.getStorageSync('jsonPerson'));
    that.setData({
      userInfo: user
    })
  },

  bindPickerChange1: function (e) {
    var arr = this.data.educations;
    this.data.userInfo.education = arr[e.detail.value];
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  bindPickerChange2: function (e) {
    var arr = this.data.industries;
    this.data.userInfo.industry = arr[e.detail.value];
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  bindPickerChange3: function (e) {
    var arr = this.data.industries;
    this.data.userInfo.expectedJob = arr[e.detail.value];
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  bindPickerChange4: function (e) {
    var arr = this.data.expectAddres;
    this.data.userInfo.expectedBase = arr[e.detail.value];
    this.setData({
      userInfo: this.data.userInfo
    })
  },

  changeSelection: function (e) {
    var that = this;
    if ("sex" == e.currentTarget.dataset.name) {
      that.data.userInfo.sex = e.detail.value;
      that.setData({
        userInfo: this.data.userInfo
      })
    } else {
      that.data.userInfo.acceptOut = e.detail.value;
      that.setData({
        userInfo: this.data.userInfo
      })
    }
  },

  checkout: function (e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    var value = e.detail.value;
    if ("phone" == name) {
      if (!(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(value))) {
        if (!(/^(\d{3,4}\-)?\d{7,8}$/i).test(value)) {
          if (!(/^0(([1-9]\d)|([3-9]\d{2}))\d{8}$/).test(value)) {
            that.setData({
              correct2: false
            })
            wx.showModal({
              title: '温馨提示',
              content: '手机格式不正确',
              showCancel: false
            })
          } else {
            that.data.userInfo.phone = value;
            that.setData({
              correct2: true,
              userInfo: that.data.userInfo
            })
          }
        } else {
          that.data.userInfo.phone = value;
          that.setData({
            correct2: true,
            userInfo: that.data.userInfo
          })
        }
      } else {
        that.data.userInfo.phone = value;
        that.setData({
          correct2: true,
          userInfo: that.data.userInfo
        })
      }
    } else {
      if ("" == value) {
        if ("1" == name) {
          that.setData({
            correct1: false
          })
        } else if ("3" == name) {
          that.setData({
            correct3: false
          })
        } else if ("4" == name) {
          that.setData({
            correct4: false
          })
        } else {
          that.setData({
            correct5: false
          })
        }
        wx.showModal({
          title: '温馨提示',
          content: '请填写完整信息',
          showCancel: false
        })
      } else {
        if ("1" == name) {
          that.data.userInfo.name = value;
          that.setData({
            correct1: true,
            userInfo: that.data.userInfo
          })
        } else if ("3" == name) {
          that.data.userInfo.age = value;
          that.setData({
            correct3: true,
            userInfo: that.data.userInfo
          })
        } else if ("4" == name) {
          that.data.userInfo.major = value;
          that.setData({
            correct4: true,
            userInfo: that.data.userInfo
          })
        } else {
          that.data.userInfo.workTime = value;
          that.setData({
            correct5: true,
            userInfo: that.data.userInfo
          })
        }
      }
    }
  },

  commit: function (e) {
    var that = this;
    if (!(that.data.correct1 && that.data.correct2 && that.data.correct3 && that.data.correct4 && that.data.correct5)) {
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整或正确',
        showCancel: false
      })
    } else {
      wx.request({
        url: 'https://561job.cn/user/update',
        data: {
          openId: that.data.userInfo.openId,
          name: that.data.userInfo.name,
          phone: that.data.userInfo.phone,
          sex: that.data.userInfo.sex,
          age: that.data.userInfo.age,
          industry: that.data.userInfo.industry,
          workTime: that.data.userInfo.workTime,
          education: that.data.userInfo.education,
          major: that.data.userInfo.major,
          expectedJob: that.data.userInfo.expectedJob,
          expectedBase: that.data.userInfo.expectedBase,
          acceptOut: that.data.userInfo.acceptOut,
          channel: that.data.userInfo.channel
        },
        method: 'GET',
        success: function (res1) {
          if ('01' == res1.data.retCode) {
            wx.showModal({
              title: '意外',
              content: '出了点小差错！',
              showCancel: false
            })
          } else {
            app.globalData.userInfo = that.data.userInfo;
            var user = JSON.stringify(that.data.userInfo);
            wx.setStorageSync('jsonPerson',user);
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  }
})