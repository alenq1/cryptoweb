import React from 'react';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';

var timedata = [];
var valuedata = [];

const Linecharts = props => {
  function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value)
      ]
    };
  }

  var data = [];
  var now = +new Date(2018, 9, 3);
  var oneDay = 24 * 3600 * 1000;
  var value = Math.random() * 1000;
  for (var i = 0; i < 1000; i++) {
    data.push(randomData());
  }

  let option = {
    title: {
      text: 'cyptotest'
    },
    textStyle: {
      color: '#ffffff'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        params = params[0];
        var date = new Date(params.name);
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear() +
          ' : ' +
          params.value[1]
        );
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        areaStyle: {},
        showSymbol: false,
        hoverAnimation: false,
        data: data
      }
    ]
  };

  setInterval(function() {
    for (var i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }

    // myChart.setOption({
    //     series: [{
    //         data: data
    //     }]
    // });
  }, 1000);

  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};

export default Linecharts;

export const Line2 = props => {
  console.log(props, 'PROPS DE LINE2');
  console.log(props.data, 'DATA PARA CREAR TIEMP0 Y CLOSE');

  let chartTime = [];

  props.data.map(rawtime => {
    chartTime.push(moment(rawtime.time).format('LT'));
  });

  let chartData = [];
  props.data.map(rawtime => {
    chartData.push(rawtime.close);
  });

  //console.log(chartTime, chartData, 'DATA LINE')

  const option = {
    textStyle: {
      color: '#000000'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartTime
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'BTC',
        data: chartData,
        type: 'line',
        areaStyle: {}
      }
    ]
  };

  // setInterval(function () {

  //         //console.log(option.xAxis.data, "tiempo")
  //         //console.log(option.series[0].data, "Valor")
  //         if(option.xAxis.data.length > 10){
  //         option.xAxis.data.shift()
  //     }
  //         option.xAxis.data.push(moment(props.time[0]).format('LTS'));
  //         //option.xAxis.data.shift();
  //         //option.xAxis.data.push(moment(props.time[0]).format('LTS'));
  //         if(option.series[0].data > 10){
  //         option.series[0].data.shift()
  //     }
  //         option.series[0].data.push(parseInt(props.values[0]));

  //     // myChart.setOption({
  //     //     series: [{
  //     //         data: data
  //     //     }]
  //     // });
  // }, 1000);

  return (
    <center>
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
        style={{ height: '300px', width: '250px' }}
      />
    </center>
  );
};

export const Line3 = props => {
  const option = {
    title: {
      text: '动态数据',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56'
        }
      }
    },
    legend: {
      data: ['最新成交价', '预购队列']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: (function() {
          var now = new Date();
          var res = [];
          var len = 10;
          while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(now - 2000);
          }
          return res;
        })()
      },
      {
        type: 'category',
        boundaryGap: true,
        data: (function() {
          var res = [];
          var len = 10;
          while (len--) {
            res.push(10 - len - 1);
          }
          return res;
        })()
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: '价格',
        max: 30,
        min: 0,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: '预购量',
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2]
      }
    ],
    series: [
      {
        name: '预购队列',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: (function() {
          var res = [];
          var len = 10;
          while (len--) {
            res.push(Math.round(Math.random() * 1000));
          }
          return res;
        })()
      },
      {
        name: '最新成交价',
        type: 'line',
        data: (function() {
          var res = [];
          var len = 0;
          while (len < 10) {
            res.push((Math.random() * 10 + 5).toFixed(1) - 0);
            len++;
          }
          return res;
        })()
      }
    ]
  };

  // app.count = 11;
  const app = 11;
  setInterval(function() {
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

    var data0 = option.series[0].data;
    var data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(app.count++);
  }, 2100);

  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};

export const Line4 = props => {
  const option = '';
  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};

export const Line5 = props => {
  const option = '';
  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};

export const Line6 = props => {
  let klinedata = [];

  for (let i = 0; i < 75; i++) {
    klinedata.push(props.data[i]);
    //    console.log(props.data[i], "KLINEDATA")
  }

  //console.log(klinedata, "klinedata")

  //let dataYe = klinedata.map( (kdata, index) => moment(kdata[0]).format('LTS'))
  let dataYe = props.values.map((map, index) => index);
  //let dataEquis = klinedata.map( (kdata, index) => parseInt(kdata[1]))
  let dataEquis = props.values.map((kdata, index) => parseInt(kdata));

  //console.log(dataYe, "dataYE")
  //console.log(dataEquis, "dataEquis")

  const option = {
    grid: {
      left: 'center',
      right: 'center',

      bottom: '20%',
      width: '100px',
      height: '35px'
    },
    textStyle: {
      color: '#ffffff'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataYe
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: dataEquis,
        type: 'line',
        areaStyle: {}
      }
    ]
  };
  return (
    <ReactEcharts
      option={option}
      style={{ height: '100px' }}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};
