

$(function() {

  // // 根据封装的方法, 获取地址栏搜索关键字
  var key = getSearch( "key" );
  $('.search_input').val( key );
  render();

  function render(){
    $(".lt_product").html('<div class="loading"></div>');

    //三个参数
     var params = {};
     params.proName = $(".search_input").val();//关键字
     params.page = 1;
     params.pageSize = 100;
     
     var $current = $(".lt_sort a.current");
     if( $current.length > 0){
       console.log("需要进行排序");
       
       var sortName = $current.data("type");
       var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
       params[sortName] = sortValue;
     }

     setTimeout(function(){
       $.ajax({
         type:"get",
         url:"/product/queryProduct",
         data:params,
         dataType:"json",
         success:function(info){
           var htmlStr = template("tpl",info);
           $('.lt_product').html(htmlStr);
         }
       })
     },1000);

  }
  // 功能二:点击搜索按钮,实现搜索
 $('.search_btn').click(function() {
    // 获取搜索框的值
    var key = $(".search_input").val();

    // 获取数组
    var jsonStr = localStorage.getItem("search_list");
    var arr = JSON.parse( jsonStr );

    // 1. 不能重复
    var index = arr.indexOf( key );
    if ( index > -1 ) {
      // 已经存在, 删除该项
      arr.splice( index, 1 );
    }
    // 2. 不能超过10个
    if ( arr.length >= 10 ) {
      arr.pop();
    }

    // 将搜索关键字添加到 arr 最前面
    arr.unshift( key );

    // 转存到本地存储中
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    render();
  });

$(".lt_sort a[data-type]").click(function(){
  if($(this).hasClass("current")){
    $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }else{
    $(this).addCalass("current").siblings().removeClass("current");
  }
  render();
})

})
