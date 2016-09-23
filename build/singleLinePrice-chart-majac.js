var singleLinePriceChart = function(options) {

  var chart = d3.select(options.targetID)
  .append('svg')
  .attr('width', '100%')
  .attr('height', '130px')
  .attr('id', options.thisID)
  .style('display', 'table')
  .style('margin', 'auto')
  .style('overflow', 'auto');
  // 그래프에 기본이 되는 메인 svg 선언함.

  var axisArg = []
  for (var i = options.axis.min; i <= options.axis.max; i += options.term) {
    axisArg.push(i);
  }

  var axisTextArg = []
  for (var i = options.axis.min; i <= options.axis.max; i += 100) {
    axisTextArg.push(i);
  }

  var px = $(options.targetID).find('svg').width();

  var guideHeight = 7;
  var axisY = 60;
  var axisHeight = '1px';
  var axisTextY = axisY + 20;

  if(options.chart == 'range') {
    axisY = 50;
    axisTextY = axisY + 30;
    axisHeight = options.axis.valueHeight / 2;
  }

  chart.selectAll('rect')
  .data(axisArg).enter()
  // 일단 x 축을 먼저 그려보자.
  .append('rect')
  .attr('x', function(d, i) {
    return ((100 / (axisArg.length - 1)) * i) + '%';
  })
  .attr('y', function() {
    if(options.chart == 'range') {
      return axisY + guideHeight;
    } else {
      return axisY + 15 - guideHeight;
    }
  })
  .attr('width', 1)
  .attr('height', function() {
    return guideHeight;
  })
  .attr('fill', '#d1d2d3');
  // x축의 guide 를 작성함.

  chart
  .append('rect')
  .attr('x', '0px')
  .attr('y', function() {
    if(options.chart == 'range') {
      return axisY;
    } else {
      return axisY + 15;
    }
  })
  .attr('width', '100%')
  .attr('height', axisHeight)
  // .attr('fill', 'red');
  .attr('fill', '#d1d2d3');
  // x 축의 guide 를 연결함.

  chart.selectAll("text")
  .data(axisTextArg)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("x", function(d, i) {
    return (((100 / (axisTextArg.length - 1)) * i)) + '%';
  })
  .attr('y', function() {
    if(options.chart == 'range') {
      return axisTextY;
    } else {
      return axisTextY + 15;
    }
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", '#d1d2d3')
  .attr("text-anchor", "middle");
  // Guide 텍스트 표시하기

  if(options.chart == 'static') {

    chart
    .append('rect')
    .attr('x', function() {
      // return (100 / options.range.min) * 100 + '%';
      // return  + '%';
      return '0px';
    })
    .attr('y', axisY - 35)
    .attr('width', function() {
      return px * ((options.afterValue - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr('height', options.axis.valueHeight / 2)
    .attr('fill', '#d1d2d3');
    // 사전예약 종료시 예상가격(bar) 그리기

    // 사전예약에 들어가는 상품화차량 bar(afterValue)의 패턴(흰색 사선 그리기) 시작
    var tempArrayForBgLine = [];
    var linePatton = 10;

    for (var i = 1; i < options.afterValue / linePatton; i++) {
      tempArrayForBgLine.push(i * linePatton);
    }
    chart.selectAll('line')
    .data(tempArrayForBgLine).enter()
    .append('line')
    .attr('x1', function(d, i) {
      return d;
    })
    .attr('x2', function(d, i) {
      return d - 5;
    })
    .attr('y1', function() {
      return axisY - 19 - guideHeight;
    })
    .attr('y2', function() {
      return axisY - 21 - (guideHeight * 2);
    })
    .style('stroke', '#FFF')
    .style('stroke-width', 2);
    // .attr('fill', 'red');
    // .attr('fill', '#FFF');

    // 사전예약 bar 흰색 사선 그리기 종료

    chart
    .append('rect')
    .attr('x', function() {
      return px * ((options.afterValue - options.axis.min) / (options.axis.max - options.axis.min)) + 'px'
    })
    .attr('y', axisY - 35 - 4)
    .attr('width', '2px')
    .style('z-index', '5')
    .attr('height', options.axis.valueHeight)
    .attr('fill', '#d1d2d3');
    // 사전예약 종료시 예상가격(Pin) 그리기

    chart
    .append('rect')
    .attr('x', function() {
      return '0px';
    })
    .attr('y', axisY - 35)
    .attr('width', function() {
      return px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min)) + 'px'
    })
    .attr('height', options.axis.valueHeight / 2)
    .attr('fill', options.color.active);
    // 사전예약 가격(bar) 그리기

    chart
    .append('rect')
    .attr('x', function() {
      return px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min)) + 'px'
    })
    .attr('y', axisY - 35 - 4)
    .attr('width', '2px')
    .attr('height', options.axis.valueHeight)
    .attr('fill', options.color.active);
    // 사전예약 가격(pin) 그리기

    chart
    .append("text")
    .text(options.value)
    .attr("x", function() {
      return px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr("y", axisY - 45)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", options.color.active)
    .style('font-weight', 'bold')
    .attr("text-anchor", "middle");
    // 사전예약 가격(text)

    chart
    .append("text")
    .text(options.valueText)
    .attr("x", function() {
      return px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr("y", axisY - 5)
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", options.color.active)
    .attr("text-anchor", "middle");
    // valueText 표시하기

    chart
    .append("text")
    .text(options.afterValue)
    .attr("x", function() {
      return px * ((options.afterValue - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr("y", axisY - 45)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", '#d1d2d3')
    .style('font-weight', 'bold')
    .attr("text-anchor", "middle");
    // 사전예약 종료 후 가격(text)

    chart
    .append("text")
    .text(options.afterValueText)
    .attr("x", function() {
      return px * ((options.afterValue - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr("y", axisY - 5)
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("fill", '#d1d2d3')
    .attr("text-anchor", "middle");
    // afterValueText 표시하기

    // valueText, afterValueText 사이 삼각형 그리기 시작

    var afterValuePosition = px * ((options.afterValue - options.axis.min) / (options.axis.max - options.axis.min));
    var valuePosition = px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min));

    var trianglesCenter = afterValuePosition - valuePosition;

    if(trianglesCenter > 100) {

      trianglesCenter -= 15;

      chart
      .append('polygon')
      .attr('points', function() {
        return trianglesCenter + ',' + (axisY - 50 - 2) + ' ' + (trianglesCenter + 10) + ',' + (axisY - 55 - 2) + ' ' + (trianglesCenter + 10) + ',' + (axisY - 45 - 2);
      })
      .attr('fill', options.color.active);

      chart
      .append('polygon')
      .attr('points', function() {
        trianglesCenter -= 15;
        return trianglesCenter + ',' + (axisY - 50 - 2) + ' ' + (trianglesCenter + 10) + ',' + (axisY - 55 - 2) + ' ' + (trianglesCenter + 10) + ',' + (axisY - 45 - 2);
      })
      .attr('fill', options.color.active);

      chart
      .append('polygon')
      .attr('points', function() {
        trianglesCenter += 30;
        return trianglesCenter + ',' + (axisY - 50 - 2) + ' ' + (trianglesCenter + 10) + ',' + (axisY - 55 - 2) + ' ' + (trianglesCenter + 10) + ',' + (axisY - 45 - 2);
      })
      .attr('fill', options.color.active);
    }

    // valueText, afterValueText 사이 삼각형 그리기 종료

  } else if(options.chart == 'range') {

    chart
    .append('rect')
    .attr('x', function() {
      // return (100 / options.range.min) * 100 + '%';
      // return  + '%';
      return px * ((options.range.min - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr('y', '50px')
    .attr('width', function() {
      return px * ((options.range.max - options.axis.min) / (options.axis.max - options.axis.min)) - px * ((options.range.min - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr('height', options.axis.valueHeight / 2)
    .attr('fill', options.color.active);
    // 상품 평균가격(options 에서 range.min, range.max 값이 반드시 존재해야 함.)

    chart
    .append("text")
    .text(options.range.min)
    .attr("x", function() {
      return px * ((options.range.min - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr("y", axisY - 5)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", options.color.active)
    
    .attr("text-anchor", "middle");
    // 상품 평균가격 최소가(range.min)

    chart
    .append("text")
    .text(options.range.max)
    .attr("x", function() {
      return px * ((options.range.max - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr("y", axisY - 5)
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", options.color.active)
    
    .attr("text-anchor", "middle");
    // 상품 평균가격 최대가(range.max)

    // chart
    // .append('rect')
    // .attr('x', function() {
    //   return px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min)) + 'px'
    // })
    // .attr('y', axisY - 4)
    // .attr('width', '2px')
    // .style('z-index', '5')
    // .attr('height', options.axis.valueHeight)
    // .attr('fill', options.color.active);
    // // 가격(Pin) 그리기

    chart
    .append('polygon')
    .attr('points', function() {
      var center = px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min));
      return center + ',' + (axisY - 5) + ' ' + (center - 13) + ',' + (axisY - 25) + ' ' + (center + 13) + ',' + (axisY - 25);
    })
    .attr('fill', options.color.active);
    // 사전예약 가격(pin) 그리기

    chart
    .append("text")
    .text(options.value)
    .attr("x", function() {
      return px * ((options.value - options.axis.min) / (options.axis.max - options.axis.min)) + 'px';
    })
    .attr("y", axisY - 30)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", options.color.active)
    .style('font-weight', 'bold')
    .attr("text-anchor", "middle");
    // 가격(text) 그리기

  }

  chart
  .append("text")
  .text('(단위 : ' + options.axis.unit + ')')
  .attr("x", '98%')
  .attr("y", '115')
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", '#d1d2d3')
  .attr("text-anchor", "middle");
  // 사전예약 가격(text)

  return chart;
}