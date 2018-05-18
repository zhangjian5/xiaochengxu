// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: [],

    key: {},
    //  存储人数
    current: -1,
    toggle: true,
    zhezhao: true,
    alert: false,
    //  游戏结束
    over: false,
    arr: [],
    a: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据
    let that = this;
    var cihui = [
      { 'wodi': '宋小宝', 'baiban': '白板', 'pm': '小沈阳' },
      { 'wodi': '摩托车', 'baiban': '白板', 'pm': '电动车' },
      { 'wodi': '牛奶', 'baiban': '白板', 'pm': '豆浆' },
      { 'wodi': '魔术师', 'baiban': '白板', 'pm': '魔法师' },
      { 'wodi': '泡泡糖', 'baiban': '白板', 'pm': '棒棒糖' },
      { 'wodi': '铁观音', 'baiban': '白板', 'pm': '碧螺春' },
      { 'wodi': '甄子丹', 'baiban': '白板', 'pm': '李连杰' },
      { 'wodi': '明星', 'baiban': '白板', 'pm': '演员' },
      { 'wodi': '小笼包', 'baiban': '白板', 'pm': '灌汤包' },
      { 'wodi': '橙子', 'baiban': '白板', 'pm': '橘子' },
      { 'wodi': '十面埋伏', 'baiban': '白板', 'pm': '四面楚歌' },
      { 'wodi': '图书馆', 'baiban': '白板', 'pm': '图书店' },
      { 'wodi': '唇膏', 'baiban': '白板', 'pm': '口红' },
      { 'wodi': '保安', 'baiban': '白板', 'pm': '保镖' },
      { 'wodi': '水盆', 'baiban': '白板', 'pm': '水桶' },
      { 'wodi': '同桌', 'baiban': '白板', 'pm': '同学' },
      { 'wodi': '大白兔', 'baiban': '白板', 'pm': '金丝猴' },
    ];
    let p = '';
    let b = '';
    let w = '';
    let suiji = Math.floor(Math.random() * cihui.length);
    for (let key in cihui[suiji]) {
      w = cihui[suiji].wodi;
      p = cihui[suiji].pm;
      b = cihui[suiji].baiban;
    }
    //  获取本地存储的数据，拿出存储的人数和卧底数据  
    wx.getStorage({
      key: 'key',
      success: function (res) {
        let brr = [];
        let bb = [];
        // 获取到白板
        var baiban = Math.floor(Math.random() * res.data.person);
        do {
          // 获取到卧底人数
          var r = Math.floor(Math.random() * (res.data.person - 1));
          if (r !== baiban) {
            // includes包括 判断是否在数组里面
            if (!brr.includes(r)) {
              brr.push(r);
            } if (brr.includes(r) && !bb.includes(baiban)) {
              bb.push(baiban);
            }
          }
          // else {
          //   wx.showToast({
          //     title: '下拉刷新'
          //   })
          // }
          // 随机的取一个数 判断是否在数组里面  不在  就把卧底放在里面 其余的就是好人
        } while (brr.length < res.data.wodi);
        console.log(brr);
        console.log(bb);
        // 存储所有的人数
        let arr = [];
        for (var i = 0; i < res.data.person; i++) {
          // 判断是否是卧底
          if (brr.includes(i)) {
            arr.push({ id: i, text: 0, position: w, status: false, src: '' });
          } else if (bb.includes(i)) {
            arr.push({ id: i, text: 2, position: b, status: false, src: '' });
          } else {
            arr.push({ id: i, text: 1, position: p, status: false, src: '' });
          }
        }
        that.setData({
          key: res.data,
          arr: arr
        })
        console.log(that.data.arr);
      },

    })
  },
  // 看牌
  showPai() {
    // console.log(this.data.arr[this.data.current].position)
    // 判断现在看牌人的身份 翻出对应的牌 position 为0  表示卧底
    if (this.data.arr[this.data.current + 1].text == 1) {
      this.setData({
        ['arr[' + (this.data.current + 1) + '].position']: this.data.words[0],
      })
    }
    else if (this.data.arr[this.data.current + 1].text == 2) {
      this.setData({
        ['arr[' + (this.data.current + 1) + '].position']: this.data.words[2],
      })
    }
    else if (this.data.arr[this.data.current + 1].text == 0) {
      this.setData({
        ['arr[' + (this.data.current + 1) + '].position']: this.data.words[1],
      })
    }

    // console.log(this.data.arr[this.data.current + 1]);
    this.setData({
      toggle: false
    })
    console.log(this.data.arr);
  },
  // 拍好了
  lookEnd() {
    // console.log(this.data.current)
    // console.log(this.data.key.person)
    if ((this.data.current + 1) == this.data.key.person - 1) {
      this.setData({
        zhezhao: false
      })
    }
    // 相机组件
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        let a = this.data.current;
        //     console.log(a);
        this.setData({
          // 储存照片
          ['arr[' + this.data.current + '].src']: res.tempImagePath,
        })
        this.setData({
          toggle: true,
          current: this.data.current + 1,
        })
      }
    })

  },
  // 查看身份
  check(e) {
    if (!this.data.arr[e.target.id].status) {
      this.setData({
        alert: true,
        checkid: Number(e.target.id)
      })
    }
  },
  no() {
    this.setData({
      alert: false,
    })
  },
  yes() {
    this.setData({
      // 改变查看牌之后的状态
      ['arr[' + this.data.checkid + '].status']: true,
      alert: false,
    })
    //如果白板出局和平民一样
    // 如果是只有2个平民的话,只要含有卧底的话  卧底胜利
    // 若在有至少2个平民的情况下，没有卧底，那么平民胜利
    var wodi = 0;
    var pinmin = 0;
    var baiban = 0;
    this.data.arr.forEach(val => {
      // 判断pinmin的个数
      if (val.text == 1 && !val.status) {
        pinmin++;
      } else if (val.text == 0 && !val.status) {
        wodi++;
      } else if (val.text == 2 && !val.status) {
        baiban++;
      }
    })
    // console.log(pinmin)
    // console.log(wodi)
    // console.log(baiban)
    // item.text ? "冤死" : '卧底'
    // this.data.arr.forEach((val) => { 
    //   console.log(val.text)
    //   if (val.text === '1'){
    //     this.data.a.push =  '冤死'
    //   } else if (val.text === '2') {
    //     this.data.a.push = '白板'
    //   } else {
    //     this.data.a.push = '卧底'
    //   }
    // });
    // console.log(this.data.a);

    if (pinmin == 2 && wodi > 0 && !baiban) {
      this.setData({
        win: "卧底胜利",
        over: true,
      })
    } else if (pinmin >= 2 && wodi == 0 && baiban == 0) {
      this.setData({
        win: "平民胜利",
        over: true,
      })
    } else if (pinmin <= 1 && wodi == 0 && baiban) {
      this.setData({
        win: "白板胜利",
        over: true,
      })
    }
  },
  restart() {
    wx.redirectTo({
      url: '/pages/main/main',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})