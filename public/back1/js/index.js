
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

   //初始化echarts_left实例
   var echarts_right = echarts.init(document.querySelector(".echarts_right"));
   option2 = {
     title: {
       text: '热门品牌销售',
       subtext: '2018年11月',
       x: 'center',
       //配置文本样式
       textStyle:{
         color:"#e92322",
         fontSize:25
       }
     },
     tooltip: {
       trigger: 'item',
       formatter: "{a} <br/>{b} : {c} ({d}%)"
     },
     legend: {
       orient: 'vertical',
       left: 'left',
       data: ['耐克', '阿迪', '阿迪王', '解放', '老北京']
     },
     series: [
       {
         name: '品牌销售',
         type: 'pie',
         radius: '55%',
         center: ['50%', '60%'],
         data: [
           { value: 335, name: '耐克' },
           { value: 310, name: '阿迪' },
           { value: 234, name: '阿迪王' },
           { value: 135, name: '解放' },
           { value: 1548, name: '老北京' }
         ],
         itemStyle: {
           emphasis: {
             shadowBlur: 10,
             shadowOffsetX: 0,
             shadowColor: 'rgba(0, 0, 0, 0.5)'
           }
         }
       }
     ]
   };
 
    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);
 
 
})