App({
  globalData: {
    token: ''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    const token = wx.getStorageSync('token')
    // 检查 token ，有则验证 token 无则请求token
    if(token && token.length !==0) {
      this.check_token(token)
    } else {
      this.login()
    }
  },
  // 验证 token
  check_token(token) {
    console.log("验证请求");
    wx.request({
      url: `http://123.207.32.32:3000/auth`,
      header: {
        token
      },
      method: 'post',
      success:(res) => {
        if(!res.data.errCode) {
          this.globalData.token = token
        }
      },
      // token 过期等异常，请求 token
      fail:() =>{
        this.login()
      }
    })
  },
  // 请求 token
  login() {
    console.log("发起了新的请求");
    wx.login({
      success:(res) =>{
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: 'post',
          data: {
            code
          },
          success:(res)=> {
            const token = res.data.token
            this.globalData.token = token
            wx.setStorageSync('token', token)            
          }
        })
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
