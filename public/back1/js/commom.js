
//1.进度条
$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  setInterval(function(){
    NProgress.done()
  },500);
});

$(function(){
  
  //2.公共导航切换
 $(".lt_aside .category").click(function(){
   $(this).next().stop().slideToggle();
 })

 //3.头部菜单的切换
 $(".lt_topbar  .icon_left").click(function(){

   $(".lt_aside").toggleClass("hidemenu");
   $(".lt_main").toggleClass("hidemenu");
   $(".lt_topbar").toggleClass("hidemenu");
 })

  //4.退出功能
  $(".lt_topbar .icon_right").click(function(){
      $("#logoutModal").modal("show");
  });
  
  //5.模态框的点击事件
  $("#logoutBtn").click(function(){

    $.ajax({
      type:"get",
      url: "/employee/employeeLogout",
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          // 退出成功
          location.href = "login.html";
        }
      }
    })
  })
})