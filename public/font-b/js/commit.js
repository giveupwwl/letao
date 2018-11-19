
// $(function(){

  //1.区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration:0.0005,
    indicators:false
 });

 //获得slider插件对象
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});



// })