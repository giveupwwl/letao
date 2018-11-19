
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
//1.渲染和分页
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("secondTpl",info);
        $('.lt_content tbody').html(htmlStr);


        // 分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, // 版本号
          totalPages: Math.ceil( info.total / info.size ),
          currentPage:info.page,
          onPageClicked:function(a,s,d,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  //2.点击添加按钮.显示添加模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");

    $.ajax({
      type:'get',
      url:"/category/queryTopCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      // dataType:"json",
      success:function(info){
        console.log(info);
        var htmlStr = template("dropdownTpl",info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  })
  //3.给下拉的所有a添加点击事件
  $(".dropdown-menu").on("click","a",function(){
    var  txt = $(this).text();

    $("#dropdownText").text(txt);

    var id = $(this).data("id");

    $('[name="categoryId"]').val(id);

    $('#form').data("bootstrapValidator").updateStatus("categoryId","VALID");
  })
  //4.文件上传初始化
 $("#fileupload").fileupload({
   dataType:'json',
   done:function(e,data){
     console.log(data);
     //后台返回数据
     var result = data.result;
     //地址
     var picAddr = result.picAddr;
     $('#imgBox img ').attr("src",picAddr);
     //设置给input
     $('[name="brandLogo"]').val(picAddr);
     $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
   }
 })

  //5.表单校验
  $('#form').bootstrapValidator({

    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  //6.注册校验成功
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      url:"/category/addSecondCategory",
      type:"post",
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
        //关闭模态框
        $('#addModal').modal('hide');
        $("#form").data("bootstrapValidator").resetForm(true);
        // 重新渲染
        currentPage = 1;
        render();

        //找到下拉菜单文本重置
        $("#dropdownText").text("请选择1级分类")
        //找到图片重置
        $("#imgBox img ").attr("src","images/none.png")
      }
    })
  })
})