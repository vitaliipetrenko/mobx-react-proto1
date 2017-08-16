import {
  AREA_CHART,
  CANDLE_STICK_CHART,
  HEIKIN_ASHI_CHART,
  KAGI_CHART,
  LINE_SCATTER_CHART,
  POINT_AND_FIGURE_CHART
} from '../constants/'
import {
  areaChartModel,
  candleStickChartModel,
  heikinAshiChartModel,
  kagiChartModel,
  lineScatterChartModel,
  pointAndFigureChartModel
} from '../models/'

const register = {
  AREA_CHART: areaChartModel,
  CANDLE_STICK_CHART: candleStickChartModel,
  HEIKIN_ASHI_CHART: heikinAshiChartModel,
  KAGI_CHART: kagiChartModel,
  LINE_SCATTER_CHART: lineScatterChartModel,
  POINT_AND_FIGURE_CHART: pointAndFigureChartModel
}

export class ChartDataProvider {
  getChartData(type) {
    return register[type];
  }
}
