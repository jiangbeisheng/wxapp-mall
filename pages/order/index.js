/**
 * 1 页面被打开的时候 onShow 
 *   0 onShow 不用于onLoad 无法在形参上接受参数的
 *   0.5 判断缓存中有没有token 
 *      1 没有 跳转到授权页面
 *      2 有 直接往下进行
 *   1 获取URL上的参数type
 *   2 根据type值 去发送请求 请求订单数据
 *   3 渲染页面
 * 2 点击不同的标题 重新发送请求来获取和渲染数据
 * 
 */
import {request} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[{
      id:0,
      value:"全部",
      isActive:true
    },
    {
      id:1,
      value:"代付款",
      isActive:false
    },
    {
      id:2,
      value:"待发货",
      isActive:false
    },
    {
      id:3,
      value:"退款/退货",
      isActive:false
    }
  ]

  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
  * 生命周期函数--监听页面显示
  */
 onShow: function (options) {
   // 没有企业账号 这里获取不到授权
   const token=wx.getStorageSync("token");
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/index'
    });
    return;
  }

    // 1 获取当前小程序的页面栈-数组 长度最大是10页面
    var pages =  getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage=pages[pages.length-1];
    // 3 获取URL上的type参数
    const type=currentPage.options;
    this.getOrders(type)
 },
  // 获取订单列表的方法
 async   getOrders(type){
    const res=await request({url:"/my/orders/all",data:{type}});
    console.log(res);
    

  },

  handleTabsItemChange(e){
    // 1 获取被点击的标题索引
    const {index}=e.detail;
    // 2 修改源数组
    let {tabs} =this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3 赋值到data中
    this.setData({
      tabs
    })
  }
})