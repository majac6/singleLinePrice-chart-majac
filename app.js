// d3.select('body').append('div').text('d3 시작하기');

// var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// d3.select('body')
// .selectAll('div')
// .data(data)
// .enter()
// .append('div')
// .style('height', function(d) {
//   return d + 'px';
// })
// .style('width', function(d) {
//   return '20px';
// })
// .attr('class', 'bar-chart');

// var options = {
//   w: 200,
//   h: 100
// };

// var svg = d3.select('body')
// .append('svg')
// .attr('width', options.w)
// .attr('height', options.h);


// svg
// .selectAll('rect')
// .data(data)
// .enter()
// .append('rect')
// .attr('x', function(d, i) {
//   return i * (options.w / data.length);
// })
// .attr('y', function(d) {
//   // console.log(options.h - d);
//   return options.h - d;
// })
// .attr('width', options.w / data.length - 1)
// .attr('height', function(d) {
//   return d;
// })
// .attr('fill', function(d) {
//   return 'pink';
// });

// svg.selectAll("text")
// .data(data)
// .enter()
// .append("text")
// .text(function(d) {
//   return d;
// })
// .attr("x", function(d, i) {
//   return i * (options.w / data.length) + (options.w / data.length) / 2;
// })
// .attr("y", function(d) {
//   return options.h - d + 10;
// })
// .attr("font-family", "sans-serif")
// .attr("font-size", "11px")
// .attr("fill", "black")
// .attr("text-anchor", "middle");

var bakcha_chart1_data = {
  chart: 'static',
  targetID: '#bakcha_chart1',
  thisID: 'mychart',
  axis: {
    min: 600,
    max: 1000,
    valueHeight: 16,
    unit: '만원'
  },
  value: 700,
  valueText: '사전예약차량',
  afterValue: 920,
  afterValueText: '상품화차량',
  term: 25,
  color: {
    active: '#27aae0'
  }
}

var bakcha_chart2_data = {
  chart: 'range',
  targetID: '#bakcha_chart2',
  thisID: 'mychart',
  axis: {
    min: 600,
    max: 1000,
    valueHeight: 16,
    unit: '만원'
  },
  range: {
    min: 641,
    max: 858,
  },
  value: 741,
  term: 25,
  color: {
    active: '#27aae0'
  }
}

singleLinePriceChart(bakcha_chart1_data);
singleLinePriceChart(bakcha_chart2_data);