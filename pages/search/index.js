

/**
 * 1 输入框绑定 值改变时间 input事件
 *    1 获取到输入框的值
 *    2 判断合法性
 *    3 检验通过 把输入框的值 发送到后台
 *    4 返回的数据打印到页面上
 * 2 防抖（防止抖动） 定时器 节流
 *    0 防抖 防止重复输入 重复请求
 *    1 节流 一般是用在页面下拉和上拉
 *    1 定义全局定时器id 
 */
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 取消 按钮 是否显示
    isFocus:true,
    // 输入框的值
    inpValue:""
  },
  TimeId:-1,
  // 输入框的值改变 就会触发的事件
  handleInput(e){
    console.log(e);
    // 1 获取输入框的值
    const {value}=e.detail;
    // 2 检测合法性
    if(!value.trim()){
      // 值不合法
      this.setData({
        goods:[],
        isFocus:true
      })
      return;
    }
    this.setData({
      isFocus:false
    })
    // 3 准备发送请求获取数据
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.qsearch(value)
    }, 1000);
 
    
  },
  // 发送请求获取搜索建议 数据
  async qsearch(query){
    const  res=await request({url:"/goods/qsearch",data:{query}})
    console.log(res);
    this.setData({
      goods:res
    })
    
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:true,
      goods:[]
    })
  }
})