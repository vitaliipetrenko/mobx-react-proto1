import React from 'react'
import {
  LineSeries,
  ScatterSeries,
  CircleMarker
} from 'react-stockcharts/lib/series'

export const lineScatterChartModel = {
  label: 'Line Scatter Chart',
  components: [
    <LineSeries
          key={1}
					yAccessor={d => d.close}
          strokeDasharray="LongDash" />,
    <ScatterSeries
          key={2}
					yAccessor={d => d.close}
					marker={CircleMarker}
					markerProps={{ r: 3, width: 8, stroke: "#2ca02c", fill: "#2ca02c" }} />]
}
