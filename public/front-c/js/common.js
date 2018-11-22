

mui(".mui-scroll-wrapper").scroll({
  indicators: false, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
})

function getId(k){
  //1.获取元素
  var str = location.search;
  //2.解码
   str = decodeURI(str);
   //3.去?
   str = str.slice(1);
   //4.用&切割
   var  arr = str.split("&");
   //5.建空对象
   var obj = {};
    //6.遍历
   arr.forEach(function(v,i){
     var key = v.split("=")[0]; 
     var value = v.split("=")[1]; 
     obj[key] = value;
   })

   return obj[k] ;

}