import React from 'react'
import {
  PointAndFigureSeries
} from 'react-stockcharts/lib/series'
import {
  pointAndFigure
} from "react-stockcharts/lib/indicator";

export const pointAndFigureChartModel = {
  label: 'Point And Figure Chart',
  calculators: [pointAndFigure()],
  components: [<PointAndFigureSeries key={1} />]
}
