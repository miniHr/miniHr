

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
    hide1: "",
    hide2: "hide",
    hide3: "hide",
    hide4: "hide",
    sex: "",
    ages: [],
    age: 0,
    industries: ["普工", "文职", "人事行政", "会计", "服务类", "策划设计", "销售", "技工", "管理", "其他"],
    industry: "请选择行业",
    worktimes: [0, 5, 10, 15],
    worktime: "请选择时间",
    educations: ["小学", "初中", "高中", "中专", "大专", "本科", "硕士"],
    education: "请选择学历",
    majors:["计算机","历史学"],
    major: "请选择专业"
  },

  //以下为自定义点击事件
  saveSex: function (e) {//绑定性别
    var that = this;
    var id = e.currentTarget.id;
    var arr = new Array();
    for (var i = 0; i <= 44; i++) {
      arr[i] = i + 16;
    }
    that.setData({
      sex: id,
      hide1: "hide",
      hide2: "",
      ages: arr
    })
  },

  bindPickerChange1: function (e) {//绑定年龄
    var arrs = this.data.ages;
    this.setData({
      index: e.detail.value,
      age: arrs[e.detail.value],
      hide2: "hide",
      hide3: "",
    })
  },
  bindPickerChange2: function (e) {//绑定行业
    var ins = this.data.industries;
    var t1 = this.data.worktime;
    this.setData({
      index: e.detail.value,
      industry: ins[e.detail.value],
    })
    if (t1 != '请选择时间') {
      this.setData({
        hide3: "hide",
        hide4: "",
      })
    }
  },
  bindPickerChange3: function (e) {//绑定时间
    var times = this.data.worktimes;
    var indus = this.data.industry;
    this.setData({
      index: e.detail.value,
      worktime: times[e.detail.value]
    })
    if (indus != '请选择行业') {
      this.setData({
        hide3: "hide",
        hide4: "",
      })
    }
  },
  bindPickerChange4: function (e) {//绑定学历
    var edus = this.data.educations;
    var m = this.data.major;
    this.setData({
      index: e.detail.value,
      education: edus[e.detail.value]
    })
    if (m != '请选择专业') {
        wx.redirectTo({
          url: '../job/job',
        })
    }
  },
  bindPickerChange5: function (e) {//绑定专业
    var mas = this.data.majors;
    var ed = this.data.industry;
    this.setData({
      index: e.detail.value,
      major: mas[e.detail.value]
    })
    if (ed != '请选择学历') {
      wx.redirectTo({
        url: '../job/job',
      })
    }
  }
})

