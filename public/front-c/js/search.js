


$(function () {

  render();

  // 读取本地存储,返回数组
  function getHistory() {
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  //渲染
  function render() {
    var arr = getHistory();
    var htmlStr = template("search-tpl", { list: arr });
    $(".lt_history").html(htmlStr);
  }

  //清空所有历史(事件委托)
  $(".lt_history").on("click", ".btn_empty", function () {

    mui.confirm("你确定要清空历史记录吗?", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index === 1) {
        // 移出本地历史
        // console.log(e.index);
        localStorage.removeItem("seaech_list");
        render();
      }
    })
  })
  //删除单个
  $(".lt_history").on("click", ".btn_delete", function () {

    var index = $(this).data("index");
    var arr = getHistory();
    arr.splice(index, 1);//删除一个
    localStorage.setItem("search_list",JSON.stringify(arr));
    render();
  })

 //添加
 $(".search_btn").click(function(){
   console.log(111);
   
   var key = $(".search_input").val().trim();
   if(key === ""){
     mui.toast("请输入搜索关键词");
     return ;
   }
   var arr = getHistory();//获取数组
   var index = arr.indexOf(key);
   if(index != -1){
     arr.splice(index,1);
   }
   if(arr.length >= 10){
     arr.pop();
   }
   arr.unshift(key);
  localStorage.setItem("search_list",JSON.stringify(arr));
  render();
  $('.search_input').val("");//清空搜索框的内容
  location.href = "searchList.html?key=" + key;
 })



})