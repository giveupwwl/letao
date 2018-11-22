

$(function(){

  //左侧
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    success:function(info){
      console.log(info );
      var  htmlStr = template("left-tpl",info);
      $(".lt_left ul").html(htmlStr);
      getSecond( info.rows[0].id);
    }
  })

  // 点击事件(事件委托)
  $(".lt_left").on("click","a",function(){
    // console.log(444);
    $(this).addClass('current').parent().siblings().find("a").removeClass("current");
    var id = $(this).data("id");
    getSecond(id);
    
  })

//右侧
function getSecond(id){
  $.ajax({
    type:"get",
    url:"/category/querySecondCategory",
    data:{
      id : id
    },
    dataType:"json",
    success:function(info){
      console.log(info);
      var htmlStr = template("right-tpl",info);
      $(".lt_right ul ").html(htmlStr);
    }
  })
}


})