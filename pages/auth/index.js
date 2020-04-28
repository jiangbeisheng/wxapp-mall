import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {login} from '../../utils/asyncWx.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
 async handleGetUserInfo(e){
    // 1 获取用户信息
      const{encryptedData,rawData,iv,signature}=e.detail;
    // 2 获取小程序登录成功后的值
    const {code} =await login();
    const loginParams={encryptedData,rawData,iv,signature,code}
    // 3 发送请求 获取用户的token
    const res=await request({url:"/users/wxlogin",data:loginParams,method:"post"});
    // 4 企业账号APPID才行
    console.log(res);
    
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})