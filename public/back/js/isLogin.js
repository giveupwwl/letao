// 判断如果用户为登录,就拦截,否则就进入

$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function (info) {
    console.log(info);
    if (info.success) {
      console.log("用户已登录,继续访问");
    }
    if (info.error === 400) {
      location.href = "login.html";
    }
  }
})