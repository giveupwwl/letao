import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

// 没登录的用户进行拦截
$.ajax({
  type:"get",
  url:"/employee/checkRootLogin",
  dataType:"json",
  success:function(info){
       console.log(info);
       if(info.success){
         console.log("用户已登录,可以继续访问"); 
       }
       if(info.error === 400 ){
         location.href = "login.html"
       }
  }
})