


$(function(){


  //1.一进页面,请求左侧一级分类数据,进行渲染
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr = template("leftTpl",info);
      $(".lt_category_left ul").html(htmlStr);
      //重新渲染
      renderById(info.rows[0].id);
    }
  });
  
  //2.给左侧添加点击事件(事件委托)
    $(".lt_category_left").on("click","a",function(){
      //高亮
      $(this).addClass("current").parent().siblings().find("a").removeClass("current");
      //获取一级分类id
      var id = $(this).data("id");
      //二级渲染
      renderById(id);
    })

  //3.渲染封装
  function renderById(id){

    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{
        id:id
      },
      dataType:"json",
      success:function(info){
        var htmlStr = template("rightTpl",info);
        $(".lt_category_right ul ").html(htmlStr);
      }
    })
  }
})