
mui(".mui-scroll-wrapper").scroll({
  deceleration: 0.0005,  //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
})

// 封装地址栏获取的方法
function getSearch(k){
//1.获取地址栏参数信息
var str = location.search;
//2.解码
 str = decodeURI(str);
 //3.去问号
 str = str.slice(1);
 //4.切割字符串
 var arr = str.split("&");
 //5.建空数组
 var obj = {};
 //6.遍历
 arr.forEach(function(v,i){
   var key = v.split("=")[0];
   var value = v.split("=")[1];
   obj[key] = value;
 })

 return obj[k];
}