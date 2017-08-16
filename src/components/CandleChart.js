import React, { Component } from 'react'
import mobx, { observable } from 'mobx'
import { observer } from 'mobx-react'
import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts"
import { extent } from 'd3-array'
import { format } from "d3-format"
import { timeFormat } from "d3-time-format"
import { scaleTime } from 'd3-scale'
import Dropdown from 'react-dropdown'

import { simpleIndicator } from "../indicators/"
 
var { CandlestickSeries, BarSeries, LineSeries, AreaSeries } = series;
let { discontinuousTimeScaleProvider, defaultScaleProvider } = scale;
let { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate, EdgeIndicator } = coordinates;
let { XAxis, YAxis } = axes;
let { OHLCTooltip, MovingAverageTooltip } = tooltip;

let { fitWidth } = helper;
var { ema, sma, heikinAshi } = indicator;

function tooltipContent(calculators) {
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{ label: "open", value: currentItem.open && numberFormat(currentItem.open) },
				{ label: "high", value: currentItem.high && numberFormat(currentItem.high) },
				{ label: "low", value: currentItem.low && numberFormat(currentItem.low) },
				{ label: "close", value: currentItem.close && numberFormat(currentItem.close) },
			]
			.concat(calculators.map(each => ({
				label: each.tooltipLabel(),
				value: numberFormat(each.accessor()(currentItem)),
				stroke: each.stroke()
			})))
			.filter(line => line.value)
		};
	};
}

const now = new Date()
const ext = [
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30, 0),
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0)
]
var ha = heikinAshi();
var ema20 = ema()
  .id(0)
  .windowSize(20)
  .merge((d, c) => {
    d.ema20 = c;
   })
  .accessor(d => {
    return d.ema20;
  });

var ema50 = ema()
  .id(2)
  .windowSize(50)
  .merge((d, c) => {d.ema50 = c})
  .accessor(d => d.ema50);

var smaVolume50 = sma()
  .id(3)
  .windowSize(50)
  .sourcePath("volume")
  .merge((d, c) => {d.smaVolume50 = c})
  .accessor(d => d.smaVolume50);

const si = simpleIndicator()
  .id(3)
  .merge((d, c) => {d.siVolume50 = c})
  .accessor(d => d.siVolume50)
  .shift(10);

const indicators = observable([ema20, ema50]);
setTimeout(() => indicators.push(si), 2000);
setTimeout(() => si.shift(20), 4000);

@observer
class CandleChart extends Component {
  render() {
    const chartData = this.props.chartData.slice()

    if (chartData.length > 0) {
      chartData[chartData.length - 1].close
      return (
        <div>
          <ChartCanvas ratio={1} width={this.props.width} height={this.props.height}
              margin={{left: 80, right: 80, top:10, bottom: 30}} type="hybrid"
              seriesName="MSFT"
              data={chartData}
              calculator={[ha, smaVolume50, ...indicators]}
              xAccessor={d => {
                return d.date;
              }}
              xScale={scaleTime()}
              xExtents={ext}>

            <Chart id={1}
              yExtents={[d => [d.high, d.low], ...indicators.map(i => i.accessor())]}
              padding={{ top: 10, bottom: 20 }}>
              <XAxis axisAt="bottom" orient="bottom"/>
              <YAxis axisAt="right" orient="right" ticks={5} />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".1f")} />

              <CandlestickSeries />

              {indicators.map((i, index) => <LineSeries key={index} yAccessor={i.accessor()} stroke={i.stroke()}/>)}
              {indicators.map((i, index) => <CurrentCoordinate key={index} yAccessor={i.accessor()} fill={i.stroke()} />)}
              {indicators.map((i, index) => <EdgeIndicator key={index} itemType="last" orient="right" edgeAt="right"
                yAccessor={i.accessor()} fill={i.fill()}/>)}
              {indicators.map((i, index) => <EdgeIndicator key={index} itemType="first" orient="left" edgeAt="left"
                yAccessor={i.accessor()} fill={i.fill()}/>)}
              <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
              <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

              <OHLCTooltip origin={[-40, 0]}/>
              <MovingAverageTooltip onClick={(e) => console.log(e)} origin={[-38, 15]}
                calculators={[ema20, ema50, si]}/>

            </Chart>
            <Chart id={2}
                yExtents={[d => [d.volume], smaVolume50.accessor()]}
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
              <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>

              <CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()} />
              <CurrentCoordinate yAccessor={d => d.volume} fill="#9B0A47" />

              <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                yAccessor={d => d.volume} displayFormat={format(".4s")} fill="#0F0F0F"/>
              <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                yAccessor={d => d.volume} displayFormat={format(".4s")} fill="#0F0F0F"/>
              <EdgeIndicator itemType="first" orient="left" edgeAt="left"
                yAccessor={smaVolume50.accessor()} displayFormat={format(".4s")} fill={smaVolume50.fill()}/>
              <EdgeIndicator itemType="last" orient="right" edgeAt="right"
                yAccessor={smaVolume50.accessor()} displayFormat={format(".4s")} fill={smaVolume50.fill()}/>
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
        </div>
		  )
    } else {
      return null
    }
	}
}

CandleChart = fitWidth(CandleChart);

export default CandleChart;