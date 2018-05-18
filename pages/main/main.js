Page({

  /**
   * 页面的初始数据
   */
  data: {
    person: {
      max: 16,
      min: 5,
      current: 5
    },
    wodi: {
      max: 5,
      min: 1,
      current: 1
    },
    baiban: {
      max: 1,
      min: 0,
      current: 0
    }
  },
  changePerson(e) {
    this.setData({
      'person.current': e.detail.value
    })
  },
  changeWodi(e) {
    this.setData({
      'wodi.current': e.detail.value
    })
  },
  changeBaiban(e) {
    this.setData({
      'baiban.current': e.detail.value
    })
  },

  start(e) {
    wx.setStorage({
      key: 'key',
      data: {
        person: this.data.person.current,
        wodi: this.data.wodi.current,
        baiban: this.data.baiban.current,
      },
      success() {
        wx.getStorage({
          key: 'key',
          success: function (res) {
            // console.log(res.data.baiban)
            if (res.data.baiban){
              wx.navigateTo({
                url: '/pages/game/game',
              })
            } else {
              wx.navigateTo({
                url: '/pages/game1/game1',
              })
            }
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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