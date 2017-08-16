import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Dropdown from 'react-dropdown'

import { chartState } from "../stores/"
import CommonChartComponent from './CommonChartComponent'
import { ChartTypeDropdownProvider } from '../providers/'

require("../styles/components/_candle-chart.scss")

const chartTypeDropdownProvider = new ChartTypeDropdownProvider()
const dropdownOptions = chartTypeDropdownProvider.getData()

chartState.setCurrentChart(dropdownOptions[0]);

@observer
export default class TestChartComponent extends Component {
  onSelectChart(selectedChart) {
    chartState.setCurrentChart(selectedChart);
  }

  render() {
    const { chartData } = this.props.store;
    const currentChart = chartState.currentChart;

		return (
			<div className="page posts">
        <Dropdown options={dropdownOptions}
            placeholder="Select a chart type"
            value={chartState.currentChart}
            onChange={this.onSelectChart} />
        <CommonChartComponent chartData={chartData} currentChartType={currentChart.value} width={900} height={480} />
			</div>
		)
  }
}
