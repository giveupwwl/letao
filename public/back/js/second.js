

$(function(){

  var currentPage = 1;
  var pageSize = 5 ;
  render();

  function render(){
    $.ajax({
      type:"get",
      url: "/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("secondTpl",info);
        $("tbody").html(htmlStr);

        //页面初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, // 版本号
          totalPages: Math.ceil( info.total / info.size ),
          currentPage:info.page,
          onPageClicked:function(a,s,d,page){
            //更新当前页
            currentPage = page;
            render();
          }
        })
      }
    })
  };

  //2.点击添加按钮,显示添加模态框
  $("#addBtn").click(function(){
    //显示模态框
    $('#addModal').modal("show");

    //发送ajax请求
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("dropdownTpl",info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  })

  //3.给下拉菜单得所有a添加点击事件(事件委托)
  $('.dropdown-menu').on("click","a", function(){
    //获取a的文本
    var txt = $(this).text();
    //将文本设置该按钮
    $("#dropdownText").text(txt);
    //获取id设置给input
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);

    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })

  //4.进行表单上传初始化
  $("#fileupload").fileupload({
    dataType:"json",
    //表示文件上传的回调函数
    done:function(e,data){
       console.log(data);
       //后台返回数据
       var result = data.result;
       //获取文件上传地址
       var picUrl = result.picAddr;
       //设置给src
       $("#imgBox img").attr("src",picUrl);
      //  实时传递给input
      $('[name="brandLogo"]').val(picUrl);
      //添加校验状态
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });

  //5.配置表单校验
  $('#form').bootstrapValidator({

    // 配置排序项, 默认会对隐藏域进行排除, 我们需要对隐藏域进行校验
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },

      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },

      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  })



})