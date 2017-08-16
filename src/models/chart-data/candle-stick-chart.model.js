import React from 'react'
import {
  CandlestickSeries
} from 'react-stockcharts/lib/series'

export const candleStickChartModel = {
  label: 'Candle Stick Chart',
  components: [<CandlestickSeries key={1} />]
}
