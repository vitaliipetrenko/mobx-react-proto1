import {
  AREA_CHART,
  CANDLE_STICK_CHART,
  HEIKIN_ASHI_CHART,
  KAGI_CHART,
  LINE_SCATTER_CHART,
  POINT_AND_FIGURE_CHART
} from '../constants/'
import { ChartDataProvider } from './chart-data.provider'

const chartDataProvider = new ChartDataProvider()
const chartTypeDropdownOptions = [
  {
    value: POINT_AND_FIGURE_CHART,
    label: chartDataProvider.getChartData(POINT_AND_FIGURE_CHART).label
  },
  {
    value: KAGI_CHART,
    label: chartDataProvider.getChartData(KAGI_CHART).label
  },
  {
    value: AREA_CHART,
    label: chartDataProvider.getChartData(AREA_CHART).label
  },
  {
    value: CANDLE_STICK_CHART,
    label: chartDataProvider.getChartData(CANDLE_STICK_CHART).label
  },
  {
    value: HEIKIN_ASHI_CHART,
    label: chartDataProvider.getChartData(HEIKIN_ASHI_CHART).label
  },
  {
    value: LINE_SCATTER_CHART,
    label: chartDataProvider.getChartData(LINE_SCATTER_CHART).label
  },
]

export class ChartTypeDropdownProvider {
  getData() {
    return chartTypeDropdownOptions;
  }
}
