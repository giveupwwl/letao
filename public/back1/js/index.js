
// 入口函数
$(function(){

  var echarts_left = echarts.init(document.querySelector('.echarts_left'));

     // 指定图表的配置项和数据
     var option1 = {
      title: {
          text: '2018年注册人数'
      },
      // 提示框
      tooltip: {
        trigger:"item"
      },
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","6月","6月"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option1);

})