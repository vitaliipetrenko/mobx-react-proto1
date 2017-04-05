import React, { Component } from 'react'
import mobx from 'mobx'
import { inject, observer } from 'mobx-react'
//console.log(CIQ.Studies.getStudyList())
@inject('store')
@observer
class ChartIQDemo extends Component {
  constructor (props) {
    super(props)
    this.props.store.fetchChartData()
    this.state = {
      stxx: null
    }
    
    this.getChartContainer = (container) => {
      this.chartContainer = container
    }
    this.quotefeed = {
      fetchInitialData: (symbol, startDate, endDate, params, cb) => {
        cb({quotes: this.chartData})
      },
      fetchUpdateData: (symbol, startdate, params, cb) => {
        const chartData = this.chartData 
        if (chartData.length) {
          const last = chartData[chartData.length - 1]
          let currentMiddle = last.Open
          let Close = Math.random() < 0.5 ? last.Open * 0.99 : last.Open * 1.01
          last.Close = Close
          last.High = Math.max(currentMiddle, Close) * 1.035
          last.Low = Math.min(currentMiddle, Close) * 0.984
          last.Volume = last.Volume + (Math.random() * 10)
        }
        cb({quotes: chartData})
      }
    }
  }
  onComponentWillRecieveProps(nextProps) {
    this.chartData = [...this.props.store.chartData]
  }
  componentDidMount() {
    const stxx =  new CIQ.ChartEngine({
      container: this.chartContainer,
      layout:{crosshair:true, "chartType": "candle","candleWidth": 8}
    })
    stxx.attachQuoteFeed(this.quotefeed, {refreshInterval: 0.25});
    stxx.newChart("WVRL", this.chartData, null, () => {
      STX.Studies.quickAddStudy(stxx, "ma" , {"Period":20,"Field":"Close","Type":"ema"}, {"MA":"#0000FF"})
      STX.Studies.quickAddStudy(stxx, "ma" , {"Period":50,"Field":"Close","Type":"ema"}, {"MA":"#00FF00"})
      STX.Studies.quickAddStudy(stxx, "volume")
      new CIQ.Tooltip({stx:stxx, ohl:true, volume:true});
    })
  }

  render() {
    this.chartData = [...this.props.store.chartData]
    return (
      <div className="chartIQDemo" ref={this.getChartContainer}></div>
    )
  }
}
export default ChartIQDemo;