

$(function(){

var currentPage = 1;
var pageSize = 5;
render();
function render(){
   $.ajax({
     type:"get",
     url:"/category/queryTopCategoryPaging",
     data:{
       page:currentPage,
       pageSize:pageSize
     },
     dataType:"json",
     success:function(info){
       console.log(info);
       var htmlStr = template("firstTpl",info);
       $("tbody").html(htmlStr);

      //  分页初始化
      $("#paginator").bootstrapPaginator({
      // 版本号
      bootstrapMajorVersion: 3,
      // 总页数
      totalPages: Math.ceil( info.total / info.size ),
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


  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function() {
    // 显示添加模态框
    $('#addModal').modal("show");
  });

    //3.表单校验功能
    $('#form').bootstrapValidator({
      // 配置校验图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',    // 校验成功
        invalid: 'glyphicon glyphicon-remove',  // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
      // 字段列表
      fields: {
        categoryName: {
          // 校验规则
          validators: {
            // 非空
            notEmpty: {
              message: "请输入一级分类"
            }
          }
        }
      }
    });


//4.注册表单验证 , 阻止默认的提交,通过ajax提交
$("#form").on("success.form.bv",function(e){
  e.preventDefault();
  //通过ajax提交
  $.ajax({
    type:"post",
    url: "/category/addTopCategory",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      if(info.success){
        $("#addModal").modal("hide");
        currentPage = 1;
        render();

        $("#form").data("bootstrapValidator").resetForm(true);
      }
    }
  })
})



})