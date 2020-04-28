Page({
  handleGetUserInfo(e) {
    const {userInfo} = e.detail;
    wx.setStorageSync("userinfo", userInfo);

  }
})