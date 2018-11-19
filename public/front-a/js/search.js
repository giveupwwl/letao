


$(function(){
   render();
  //读取本地存储,返回数组
   function getHistory(){
     var jsonStr = localStorage.getItem("search_list") || '[]';
     var arr = JSON.parse(jsonStr);
     return arr;
   }

//页面渲染
   function render(){
     var arr = getHistory();
     var htmlStr = template("search_tpl",{list:arr});
     $(".lt_history").html(htmlStr);
   }

   //清空所有历史
   $('.lt_history').on("click",".btn_empty",function(){

      mui.confirm("你确定要清空历史记录嘛?", "文星提示", ["取消", "确认"],function(e){

        if(e.index === 1){
          localStorage.removeItem("search_list");
          render();
        }
      })
   });

   //删除单个历史记录
   $(".lt_history").on("click",".btn_delete",function(){
       //获取下标  
       var index = $(this).data("index");
       //获取本地储存的数组
        var arr = getHistory();

        arr.splice(index,1);

        localStorage.setItem("search_list",JSON.stringify(arr));
        render();
   });
   //添加单个历史记录
   $(".search_btn").click(function(){
     //获取搜索关键字
     var key  = $('.search_input').val().trim();
     if(key === ""){
       mui.toast("请输入搜索关键字");
       return;
     }
     //获取数组
     var arr = getHistory();
     //1.功能需求,如果有重复项将其删除,并从后面删除
     if(arr.length >= 10){
       arr.pop();
     }
     arr.unshift(key);
     //转成jsonStr,存储到本地
     localStorage.setItem("search_list",JSON.stringify(arr));
        render();
        //清空搜索的内容
        $(".search_input").val();
        location.href = "searchList.html?key=" + key;

   })


})