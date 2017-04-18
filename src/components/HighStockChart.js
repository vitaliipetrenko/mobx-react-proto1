import React, { Component } from 'react'
import mobx from 'mobx'
import { inject, observer } from 'mobx-react'

var that

@observer
class HighStockChart extends Component {
 constructor (props) {
   super(props)
   this.props.store.fetchChartData()
   this.getChartContainer = (container) => {
     this.chartContainer = container
   }
 }


 componentDidMount() {
   that = this
   this.chart = Highcharts.stockChart(this.chartContainer, {
     chart: {
       events: {
           load: function () {
               let candles = this.series[0];
               let volumes = this.series[1];
               setInterval(() => {
                 let chartData = that.props.store.chartData
                 if (chartData.length) {
                   const last = chartData[chartData.length - 1]
                   let currentMiddle = last.open
                   let close = Math.random() < 0.5 ? last.open * 0.99 : last.open * 1.01
                   last.close = close
                   last.high = Math.max(currentMiddle, close) * 1.035
                   last.low = Math.min(currentMiddle, close) * 0.984
                   last.volume = last.volume + (Math.random() * 10)
                 }

                 candles.setData(chartData, true, false, true)
                 let volumeData = []
                 for (let row of chartData) {
                     volumeData.push([
                        row.date,
                        row.volume
                     ])
                 }
                 volumes.setData(volumeData, true, false, true)

               }, 250);
           }
       }
   },
     rangeSelector: {
         buttons: [{
             type: 'hour',
             count: 1,
             text: '1h'
         }, {
             type: 'day',
             count: 1,
             text: '1D'
         }, {
             type: 'all',
             count: 1,
             text: 'All'
         }],
         selected: 1,
         inputEnabled: false
     },
     title: {
         text: 'AAPL Historical'
     },
     yAxis: [{
         labels: {
             align: 'right',
             x: -3
         },
         title: {
             text: 'OHLC'
         },
         height: '60%',
         lineWidth: 2
     }, {
         labels: {
             align: 'right',
             x: -3
         },
         title: {
             text: 'Volume'
         },
         top: '65%',
         height: '35%',
         offset: 0,
         lineWidth: 2
     }],
     tooltip: {
         split: true
     },
     series: [{
         type: 'candlestick',
         name: 'AAPL',
     }, {
         type: 'column',
         name: 'Volume',
         yAxis: 1,
     }],
     turboThreshold: 5000
   })
 }

 componentWillUnmount() {
   this.chart.destroy()
 }

 render() {
   return (
     <div style={{width: `${this.props.width}px`, height: `${this.props.height}px`}} ref={this.getChartContainer}></div>
   )
 }
}
export default HighStockChart;