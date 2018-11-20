

$(function(){

  render();

  //1.读取本地储存,返回数组
  function getHistory(){
    //读取不存在的item时,返回null 应该进行处理
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(jsonStr);//转数组
    return arr;
  }

  //2.根据数组渲染
  function render(){

    var arr = getHistory();
    var htmlStr = template("searchTpl",{list:arr});
    $('.lt_history').html(htmlStr);
  }

  //3.清空历史
  $(".lt_history").on("click",".btn_empty",function(){
    mui.confirm("你确定要清空历史记录嘛?", "文星提示", ["取消", "确认"], function( e ) {
         if(e.index === 1){
           localStorage.removeItem("search_list");
           //重新渲染
           render();
         }
    })

  });
  //4.删除单个历史记录
  $(".lt_history").on("click",".btn_delete",function(){
    var index = $(this).data("index");//获取下标
    var arr = getHistory();//获取本地存储的数组
    arr.splice(index,1);//删除 arr.splice(从哪开始, 删几个, 添加的项1, 添加的项2, .... );
    localStorage.setItem("search_list",JSON.stringify(arr));//转成jsonStr,存储到本地
    
    render();
  });

  //5.添加单个历史记录功能
  $(".search_btn").click(function(){
    //获取关键词
    var key = $(".search_input").val().trim();
    if(key === ""){
      mui.toast("请输入搜索关键词");
      return ;
    }

    //获取数组
    var arr = getHistory();
    //功能需求
    var index = arr.indexOf(key);
    if(index != -1){
      arr.splice(index,1);
    }
    if(arr.length >= 10 ){
      arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
    $(".search_input").val("");
    location.href = "searchList.html?key=" + key;
  })
})