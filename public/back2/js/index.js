$(function(){

  // 基于准备好的dom，初始化echarts实例
  var echarts_left = echarts.init(document.querySelector('.echarts_left'));

  // 指定图表的配置项和数据
  var option = {
      title: {
          text: '2018年注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数','销量']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","5月","6月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [50, 200, 306, 100, 100, 200]
      },
     {
          name: '销量',
          type: 'bar',
          data: [532, 220, 366, 180, 130, 20]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_left.setOption(option);



 // 基于准备好的dom，初始化echarts实例
  var echarts_right = echarts.init(document.querySelector('.echarts_right'));

  option1 = {
    backgroundColor: '#2c343c',

    title: {
        text: '热门品牌',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:274, name:'老北京'},
                {value:235, name:'解放'},
                {value:400, name:'李宁'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};


  // 使用刚指定的配置项和数据显示图表。
  echarts_right.setOption(option1);

})