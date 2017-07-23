

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "applicant",
  /**
   * 页面的初始数据
   */

  data: {
    index: 0,
    industries: ["普工", "人事行政", "会计", "服务类", "策划设计", "销售", "技工", "管理", "其他"],
    industry: "请点击选择工作经验",
    educations: ["小学", "初中", "高中", "中专", "大专", "本科", "硕士"],
    education: "请点击选择学历",
    ways: ["微信公众号", "QQ群", "智诚招聘网", "论坛门户", "广播电视", "出租车广告", "小程序", "熟人介绍", "其它"],
    way: "请点击选择渠道",
    expectAddres: ["淮北全市", "相山区", "杜集区", "烈山区", "濉溪县", "合肥", "芜湖", "宿州", "徐州/宿迁", "南京/苏州/无锡/常州/镇江", "杭州/宁波/温州", "珠三角"],
    expectAddr: "请点击选择期望工作地点",
    expectType: "请点击选择期望工作类型",
    correct1: false,
    correct2: false,
    correct3: false,
    correct4: false,
    correct5: false,
    sex:0,
    nolocal:0
  },

  bindPickerChange1: function (e) {
    var arr = this.data.educations;
    this.setData({
      education: arr[e.detail.value]
    })
  },

  bindPickerChange2: function (e) {
    var arr = this.data.industries;
    this.setData({
      industry: arr[e.detail.value]
    })
  },

  bindPickerChange3: function (e) {
    var arr = this.data.industries;
    this.setData({
      expectType: arr[e.detail.value]
    })
  },

  bindPickerChange4: function (e) {
    var arr = this.data.expectAddres;
    this.setData({
      expectAddr: arr[e.detail.value]
    })
  },

  bindPickerChange5: function (e) {
    var arr = this.data.ways;
    this.setData({
      way: arr[e.detail.value]
    })
  },

  changeSelection:function(e){
    var that=this;
    if ("sex" == e.currentTarget.dataset.name){
      that.setData({
        sex:e.detail.value
      })
    }else{
      that.setData({
        nolocal: e.detail.value
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
            that.setData({
              correct2: true
            })
          }
        } else {
          that.setData({
            correct2: true
          })
        }
      } else {
        that.setData({
          correct2: true
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
          that.setData({
            correct1: true
          })
        } else if ("3" == name) {
          that.setData({
            correct3: true
          })
        } else if ("4" == name) {
          that.setData({
            correct4: true
          })
        } else {
          that.setData({
            correct5: true
          })
        }
      }
    }
  },

  commit: function (e) {
    var that = this;
    if (!(that.data.correct1 && that.data.correct2 && that.data.correct3 && that.data.correct4 && that.data.correct5) || that.data.industry == "请点击选择工作经验" || that.data.education == "请点击选择学历" || that.data.way == "请点击选择渠道" || that.data.expectAddr == "请点击选择期望工作地点" || that.data.expectType == "请点击选择期望工作类型") {//校验失败
      wx.showModal({
        title: '提示',
        content: '请将信息填写完整或正确',
        showCancel: false
      })
    } else {
      var person={
        openId: wx.getStorageSync('openId'),
        sex:that.data.sex,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        age: e.detail.value.age,
        industry: that.data.industry,
        workTime: e.detail.value.worktime,
        education: that.data.education,
        major: e.detail.value.major,
        expectedJob: that.data.expectType,
        expectedBase: that.data.expectAddr,
        acceptOut: that.data.nolocal,
        channel: that.data.way
      };
      var jsonPerson=JSON.stringify(person);
      wx.redirectTo({
        url: 'pass?jsonPerson='+jsonPerson+'&isInsert=yes'
      })
    }
  }
})