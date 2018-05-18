//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // banner
    imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    topImg: '../img/1.png',
    imgone: ['../img/2.jpg',
      '../img/2.jpg',
      '../img/2.jpg',
      '../img/2.jpg',
      '../img/2.jpg'
    ], 
   
  },
  top: function (event) {
    console.log('点击事件')
  }

})
