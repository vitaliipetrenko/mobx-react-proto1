import React, { Component } from 'react'
import mobx from 'mobx'
import { observer } from 'mobx-react'
import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts"
import { extent } from 'd3-array'
import { format } from "d3-format"
 
let { CandlestickSeries, BarSeries } = series;
let { discontinuousTimeScaleProvider } = scale;
let { XAxis, YAxis } = axes;

let { fitWidth } = helper;

@observer
class MyChart extends Component {
  render() {
    const chartData = mobx.toJS(this.props.chartData)
    if (chartData[chartData.length - 1]) {
      return (
        <ChartCanvas ratio={1} width={950} height={300}
            margin={{ left: 50, right: 50, top:10, bottom: 30 }} type="hybrid"
            seriesName="MSFT"
            data={chartData}
            xAccessor={d => d.data}
            xScaleProvider={discontinuousTimeScaleProvider}
            xExtents={extent(chartData, d => d.data)}>

          <Chart id={1} yExtents={d => [d.high, d.low]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
            <YAxis axisAt="right" orient="right" ticks={5} />
            <CandlestickSeries />
          </Chart>
          <Chart id={2} yExtents={d => d.volume}>
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>
             <BarSeries yAccessor={d => d.volume} />
          </Chart>
        </ChartCanvas>
		  )
    } else {
      return null
    }
	}
}

MyChart = fitWidth(MyChart);

export default MyChart;