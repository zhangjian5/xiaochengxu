// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: [],

    key: {},
    current: 0,
    toggle: true,
    zhezhao: true,
    alert: false,
    over: false,
    arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据
    let that = this;
    var cihui = [
      { 'wodi': '宋小宝', 'pm': '小沈阳' },
      { 'wodi': '摩托车', 'pm': '电动车' },
      { 'wodi': '牛奶', 'pm': '豆浆' },
      { 'wodi': '魔术师', 'pm': '魔法师' },
      { 'wodi': '泡泡糖', 'pm': '棒棒糖' },
      { 'wodi': '铁观音', 'pm': '碧螺春' },
      { 'wodi': '甄子丹', 'pm': '李连杰' },
      { 'wodi': '明星', 'pm': '演员' },
      { 'wodi': '小笼包', 'pm': '灌汤包' },
      { 'wodi': '橙子', 'pm': '橘子' },
      { 'wodi': '十面埋伏', 'pm': '四面楚歌' },
      { 'wodi': '图书馆', 'pm': '图书店' },
      { 'wodi': '唇膏', 'pm': '口红' },
      { 'wodi': '保安', 'pm': '保镖' },
      { 'wodi': '水盆', 'pm': '水桶' },
      { 'wodi': '同桌', 'pm': '同学' },
      { 'wodi': '大白兔', 'pm': '金丝猴' },
    ];
    let p = '';
    let b = '';
    let w = '';
    let suiji = Math.floor(Math.random() * cihui.length);
    for (let key in cihui[suiji]) {
      w = cihui[suiji].wodi;
      p = cihui[suiji].pm;
    }
    //  获取本地存储的数据，拿出存储的人数和卧底数据  
    wx.getStorage({
      key: 'key',
      success: function (res) {
        let brr = [];
        do {
          var r = Math.floor(Math.random() * res.data.person);
          if (!brr.includes(r)) {
            brr.push(r);
          }
        } while (brr.length < res.data.wodi);

        let arr = [];
        for (var i = 0; i < res.data.person; i++) {
          if (brr.includes(i)) {
            arr.push({
              id: i, text: 0, position: w, status: false, src: ''
            });
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
  showPai() {
    if (this.data.arr[this.data.current].text) {
      this.setData({
        ['arr[' + this.data.current + '].position']: this.data.words[0],
      })
    } else {
      this.setData({
        ['arr[' + this.data.current + '].position']: this.data.words[1],
      })
    }
    this.setData({
      toggle: false
    })
    console.log(this.data.arr);
  },
  lookEnd() {

    if (this.data.current == this.data.key.person - 1) {
      this.setData({
        zhezhao: false
      })
    }
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        let a = this.data.current;
        this.setData({
          ['arr[' + this.data.current + '].src']: res.tempImagePath,
        })
        this.setData({
          toggle: true,
          current: this.data.current + 1,
        })
      }
    })

  },
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
      ['arr[' + this.data.checkid + '].status']: true,
      alert: false,
    })

    // 如果是只有2个平民的话,只要含有卧底的话  卧底胜利
    // 若在有至少3个平民的情况下，没有卧底，那么平民胜利
    var wodi = 0;
    var pinmin = 0;
    this.data.arr.forEach(val => {
      if (val.text && !val.status) {
        pinmin++;
      } else if (val.text == 0 && !val.status) {
        wodi++;
      }
    })

    if (pinmin == 2 && wodi > 0) {
      this.setData({
        win: "卧底胜利",
        over: true,
      })
    } else if (pinmin > 2 && wodi == 0) {
      this.setData({
        win: "平民胜利",
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