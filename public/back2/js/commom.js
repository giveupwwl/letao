

//1.进度条
$(document).ajaxStart(function(){
  NProgress.start() ;
})
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done() 
  },500);
})


$(function(){
  
  //2.分类管理栏切换
 $(".lt_side .category").click(function(){
   $(this).next().stop().slideToggle();
 })




})