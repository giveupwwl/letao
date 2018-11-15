
// 入口函数
$(function(){
 //1.验证信息
 $("#form").bootstrapValidator({
   feedbackIcons:{
    valid: 'glyphicon glyphicon-ok',    // 校验成功
    invalid: 'glyphicon glyphicon-remove',  // 校验失败
    validating: 'glyphicon glyphicon-refresh'  // 校验中
   },
   fields:{
     username:{
       validators:{
         //非空
         notEmpty:{
           message:"用户名不能为空"
         },
         //长度
         stringLength:{
           min:2,
           max:6,
           message:"用户名长度必须2-6位"
         },
         //配置回调函数的提示信息
         callback:{
           message:"用户名不存在"
         }
       }
     },
     password:{
         validators:{
           //非空
           notEmpty:{
             message:"密码不能为空"
           },
           //长度
           stringLength:{
             min:6,
             max:12,
             message:"密码长度为6-12位"
           },
           //配置回调函数的提示信息
           callback:{
             message:"密码错误"
           }
         }
     }
   }
 })

 //2.ajax请求
 $("#form").on("success.form.bv",function(e){
  e.preventDefault();//重置
  $.ajax({
    type:"post",
    url:"",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
        console.log(info);
        if(info.success){
          location.href = "index.html";
        }     
        if(info.error === 1000){
          $("#form").data("bootstrapVolidator").updataStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
          $("#form").data("bootstrapVolidator").updataStatus("password","INVALID","callback");

        }
    }
  })

 })
 //3.重置设置
 $('[type="reset"]').click(function(){
   $("#form").data("bootstrapVolidator").resetForm();
 })

})