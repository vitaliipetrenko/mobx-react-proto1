
import React, { Component } from "react";
import { observable } from 'mobx'
import { observer } from "mobx-react"
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { scaleTime } from 'd3-scale'

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { ChartDataProvider } from '../providers/'

@observer
class CommonChartComponent extends Component {
	getChartCanvas() {
		return this.refs.chartCanvas;
  }
  
  calculateData(data, calculators) {
    if (!calculators.length) {
      return data
    }

    return calculators.reduce(
      (accumulator, currentCalculator) => currentCalculator(accumulator),
      data
    )
  }

	render() {
    const initialData = this.props.chartData.slice();
    const { type, width, ratio, currentChartType } = this.props;
    const chartDataProvider = new ChartDataProvider();
    const currentChart = chartDataProvider.getChartData(currentChartType);
    const calculators = currentChart.calculators || [];
    const { components } = currentChart;

    if (initialData.length > 0) {
      initialData[initialData.length - 1].close

      const calculatedData = this.calculateData(initialData, calculators)
      const xScaleProvider = discontinuousTimeScaleProvider
        .inputDateAccessor(d => d.date);
      const {
        data,
        xScale,
        xAccessor,
        displayXAccessor,
      } = xScaleProvider(calculatedData);

      const start = xAccessor(last(data));
      const end = xAccessor(data[Math.max(0, data.length - 150)]);
      const xExtents = [start, end];

      return (
        <ChartCanvas height={400}
            ratio={ratio}
            width={width}
            margin={{ left: 80, right: 80, top: 10, bottom: 30 }}
            type={type}
            seriesName="MSFT"
            data={data}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            xExtents={xExtents}>
          <Chart id={1}
              yExtents={d => [d.high, d.low]}
              padding={{ top: 10, bottom: 20 }}>
            <XAxis axisAt="bottom" orient="bottom"/>
            <YAxis axisAt="right" orient="right" ticks={5} />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".4s")} />

            { components }
            
            <OHLCTooltip origin={[-40, 0]}/>
          </Chart>
          <Chart id={2}
              yExtents={d => d.volume}
              height={150} origin={(w, h) => [0, h - 150]}>
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>

            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat("%Y-%m-%d")} />
            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format(".4s")} />

            <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>

      );
    } else {
      return null
    }
	}
}
CommonChartComponent.propTypes = {
	chartData: PropTypes.object.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CommonChartComponent.defaultProps = {
	type: "svg",
};
CommonChartComponent = fitWidth(CommonChartComponent);

export default CommonChartComponent;
