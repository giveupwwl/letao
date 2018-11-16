//1.进度条
 //开始时开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
});
//结束时关闭进度条
  $(document).ajaxStart(function(){
    setTimeout(function(){
      NProgress.start();
    },500);
  });


  //2.jquery入口函数,就执行
  $(function(){

     //功能1:导航点击功能
    $('.lt_aside .category').click(function(){
      $(this).next().stop().slideToggle();
    });

     //功能2:左侧菜单切换功能
     $(".lt_topbar .icon_left ").click(function(){
       $(".lt_aside").toggleClass("hidemenu");
       $(".lt_main").toggleClass("hidemenu");
       $(".lt_topbar").toggleClass("hidemenu");
     })

      //  功能3:退出功能
      $(".lt_topbar .icon_right").click(function(){
             console.log("ssss");
             
        $('#logoutModal').modal("show");
      });

       //模态框的按钮点击事件
       $("#logoutModal").click(function(){
         
            $.ajax({
              type:"get",
              url:"",
              dataType:"json",
              success:function(info){
                console.log(info);
                if(info.success){
                  location.href = "login.html";
                }
              }
            });
       })

     })
    

