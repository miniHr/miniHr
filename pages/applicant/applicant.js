

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
    index:0,
    industries: ["普工", "人事行政", "会计", "服务类", "策划设计", "销售", "技工", "管理", "其他"],
    industry: "",
    educations: ["小学", "初中", "高中", "中专", "大专", "本科", "硕士"],
    education: "",
    ways: ["微信公众号", "QQ群", "智诚招聘网", "论坛门户", "广播电视", "出租车广告", "小程序", "熟人介绍", "其它"],
    way: "",
    expectAddres: ["淮北全市", "相山区", "杜集区", "烈山区", "濉溪县", "合肥", "芜湖", "宿州", "徐州/宿迁", "南京/苏州/无锡/常州/镇江", "杭州/宁波/温州", "珠三角"],
    expectAddr: "",
    expectType: ""
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
  }
})

