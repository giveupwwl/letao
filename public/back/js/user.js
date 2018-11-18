

$(function(){

  var currentPage = 1;//当前页
  var pageSize = 5;//每页条数
  var currentId;//当前正在修改的用户id
  var isDelete;//需要修改的状态

  render();
  //封装ajax请求
  function render(){
    $.ajax({
      type:'get',
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("tmp",info);
  
        $('tbody').html(htmlStr);

        //进行分页初始化
         $("#paginator").bootstrapPaginator({
           //版本号
           bootstrapMajorVersion:3,
           totalPages:Math.ceil(info.total / info.size),//总页数
           currentPage:info.page,//当前页
           //点击事件
           onPageClicked:function(a,b,c,page){
              //  根据page,请求对应的数据,进行渲染
              currentPage = page;
              //重新渲染
              render();
           }
         })
      }
    });
  }

   //给启用禁用按钮,添加点击事件(事件委托)
    
   $('.lt_content tbody').on("click",".btn",function(){
     //显示模态框
     $("#userModal").modal("show");
    //  获取用户id
     currentId = $(this).parent().data("id");
     //更改状态
     isDelete  = $(this).hasClass("btn-danger") ? 0 : 1;
   });
   
   $("#confirmBtn").click(function(){
     $.ajax({
       type:"post",
       url: "/user/updateUser",
       data:{
         id:currentId,
         isDelete:isDelete
       },
       dataType:"json",
       success:function(info){
           console.log(info);
           if(info.success){
             //修改成功.关闭模态框
             $("#userModal").modal("hide");
             //重新渲染
             render();
           }
       }
     })
   })


})