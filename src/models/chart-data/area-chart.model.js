import React from 'react'
import {
  AreaSeries
} from 'react-stockcharts/lib/series'

export const areaChartModel = {
  label: 'Area Chart',
  components: [<AreaSeries key={1} yAccessor={d => d.close} />]
}
