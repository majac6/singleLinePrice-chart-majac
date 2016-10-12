var data1 = {
  chart: 'static',
  targetID: '#bakcha_chart1',
  thisID: 'mychart',
  axis: {
    min: 880,
    max: 1180,
    valueHeight: 16,
    unit: '만원'
  },
  value: 980,
  valueText: '사전예약차량',
  afterValue: 1080,
  afterValueText: '상품화차량',
  term: 25,
  color: {
    active: '#27aae0'
  }
}

var data2 = {
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

singleLinePriceChart(data1);
singleLinePriceChart(data2);