

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
    indexs: 0,
    hide1: "",
    hide2: "hide",
    hide3: "hide",
    hide4: "hide",
    sex: "",
    ages: [],
    age: 16,
    industries: ["应届毕业生", "普工", "人事行政", "会计", "服务类", "策划设计", "销售", "技工", "管理", "其他"],
    industry: "请选择行业",
    worktimes: [],
    worktime: "请选择时间",
    educations: ["小学", "初中", "高中", "中专", "大专", "本科", "硕士"],
    education: "请选择学历",
    major: "请填写专业"
  },

  //以下为自定义点击事件
  saveSex: function (e) {//绑定性别
    var that = this;
    var id = e.currentTarget.id;
    var arr = new Array();
    var arr2 = new Array();
    for (var i = 0; i <= 44; i++) {
      arr[i] = i + 16;
    }
    for (var i = 0; i <= 50; i++) {
      arr2[i] = i;
    }
    that.setData({
      sex: id,
      hide1: "hide",
      hide2: "",
      ages: arr,
      worktimes:arr2
    })
  },

  bindPickerChange1: function (e) {//绑定年龄
    var arrs = this.data.ages;
    this.setData({
      age: arrs[e.detail.value],
      hide2: "hide",
      hide3: "",
    })
  },
  bindPickerChange2: function (e) {//绑定行业
    var ins = this.data.industries;
    var t1 = this.data.worktime;
    this.setData({
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
      education: edus[e.detail.value]
    })
    if (m != '请填写专业') {
      wx.redirectTo({
        url: '../job/job?sex=' + this.data.sex + '&age=' + this.data.age + '&industry=' + this.data.industry + '&worktime=' + this.data.worktime + '&education=' + this.data.education + '&major=' + this.data.major
      })
    }
  },
  bindPickerChange5: function (e) {//绑定专业
    var str = e.detail.value;
    var es = this.data.education;
    if (str == '') {
      return;
    }
    if (es == '请选择学历') {
      this.setData({
        major: str
      })
      return;
    } else {
      this.setData({
        major: str
      })
      wx.redirectTo({
        url: '../job/job?sex=' + this.data.sex + '&age=' + this.data.age + '&industry=' + this.data.industry + '&worktime=' + this.data.worktime + '&education=' + this.data.education + '&major=' + this.data.major
      })
    }
  }
})

