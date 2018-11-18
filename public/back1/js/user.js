
$(function(){
  
  var currentPage = 1;//当前页
  var pageSize = 5; 
  var currentId;//用户需要修改的id
  var isDelete;//需要修改的状态

  render();

  function render(){

    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      datType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("tmp",info);
        $('tbody').html(htmlStr);

        //页面初始化
        $("#paginator").bootstrapPaginator({
          //版本号
          bootstrapMajorVersion:3,
          // 总页数
          totalPages:Math.ceil(info.total / info.size),
          // 当前页
          currentPage:info.page,
          // 点击事件
          onPageClicked:function(a,s,d,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  };



  // 禁用启用按钮
  $(".lt_content tbody").on("click",".btn",function(){
    //显示模态框
    $("#userModal").modal("show");
    //获取用户id
    currentId = $(this).parent().data("id");
    //更改状态
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1 ;
  });


  // 发送请求 改变用户状态
  $("#confirmBtn").click(function(){
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:currentId,
        isDelete:isDelete
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
         $("#userModal").modal("hide");
          render();
        }
        
      }
    })
  })





})