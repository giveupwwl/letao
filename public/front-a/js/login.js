

$(function(){

  //登录功能
  $('').click(function(){
    //获取用户名和密码,发送ajax
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    
    if(username === ""){
      mui.toast("请输入用户名");
      return;
    }

    if(password === ""){
      mui.toast("请输入密码");
      return;
    }

    $.ajax({
      type:"post",
      url:"/user/login",
      data:{
        username:username,
        password:password
      },
      dataType:"json",
      success:function(info){
        if(info.success){
              //用户登录成功,跳转用户中心
              if(location.search.indexOf("retUrl") != -1){
                // 如果地址栏retUrl 获取,并跳转回去
                // 若没有retUrl 整场跳转user.html
                var retUrl = location.search.replace("?retUrl=","");
                //跳转到指定地址
                location.href = retUrl;
              }else{
                //没传递
                location.href = "user.html";
              }
        }

        if(info.error){
          mui.toast("用户名或者密码错误");
        }
      }
    })
  })
})