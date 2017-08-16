import React from 'react'
import {
  CandlestickSeries
} from 'react-stockcharts/lib/series'
import {
  heikinAshi
} from "react-stockcharts/lib/indicator";

export const heikinAshiChartModel = {
  label: 'Heikin Ashi Chart',
  calculators: [heikinAshi()],
  components: [<CandlestickSeries key={1} />]
}
