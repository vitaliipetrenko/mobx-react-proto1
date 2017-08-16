import React from 'react'
import {
  KagiSeries
} from 'react-stockcharts/lib/series'
import {
  kagi
} from "react-stockcharts/lib/indicator";

export const kagiChartModel = {
  label: 'Kagi Chart',
  calculators: [kagi()],
  components: [<KagiSeries key={1} />]
}
