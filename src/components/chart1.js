import React, { Component } from 'react'
import mobx from 'mobx'
import { observer } from 'mobx-react'
import { ChartCanvas, Chart, series, scale, axes, helper } from "react-stockcharts";
import { extent } from 'd3-array'
import { format } from "d3-format"
 
let { AreaSeries } = series;
let { discontinuousTimeScaleProvider } = scale;
let { XAxis, YAxis } = axes;

let { fitWidth } = helper;

@observer
class AreaChart extends Component {
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

          <Chart id={3} yExtents={d => d.close}>
              <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
              <YAxis axisAt="left" orient="left" />
              <AreaSeries yAccessor={(d) => d.close}/>
          </Chart>
        </ChartCanvas>
		  )
    } else {
      return null
    }
	}
}

AreaChart = fitWidth(AreaChart);

export default AreaChart;