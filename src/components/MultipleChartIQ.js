import React, { Component } from 'react'
import mobx from 'mobx'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class MultipleChartIQ extends Component {
  constructor (props) {
    super(props)
    this.props.store.fetchChartData()
    this.state = {
      stxx1: null,
      stxx2: null,
      stxx3: null,
      stxx4: null
    }
    this.getChartContainer1 = (container) => {
      this.chartContainer1 = container
    }
    this.getChartContainer2 = (container) => {
      this.chartContainer2 = container
    }
    this.getChartContainer3 = (container) => {
      this.chartContainer3 = container
    }
    this.getChartContainer4 = (container) => {
      this.chartContainer4 = container
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
    const stxx1 = new CIQ.ChartEngine({
      container: this.chartContainer1,
      layout:{crosshair:true, "chartType": "candle","candleWidth": 8}
    })
    stxx1.attachQuoteFeed(this.quotefeed, {refreshInterval: 0.25});
    stxx1.newChart("WVRL", this.chartData, null, () => {
      STX.Studies.quickAddStudy(stxx1, "ma" , {"Period":20,"Field":"Close","Type":"ema"}, {"MA":"#0000FF"})
      STX.Studies.quickAddStudy(stxx1, "ma" , {"Period":50,"Field":"Close","Type":"ema"}, {"MA":"#00FF00"})
      STX.Studies.quickAddStudy(stxx1, "volume")
      // new CIQ.Tooltip({stx:stxx1, ohl:true, volume:true})
    })

    const stxx2 =  new CIQ.ChartEngine({
      container: this.chartContainer2,
      layout:{crosshair:true, "chartType": "candle","candleWidth": 8}
    })
    stxx2.attachQuoteFeed(this.quotefeed, {refreshInterval: 0.25});
    stxx2.newChart("WVRL", this.chartData, null, () => {
      STX.Studies.quickAddStudy(stxx2, "ma" , {"Period":20,"Field":"Close","Type":"ema"}, {"MA":"#0000FF"})
      STX.Studies.quickAddStudy(stxx2, "ma" , {"Period":50,"Field":"Close","Type":"ema"}, {"MA":"#00FF00"})
      STX.Studies.quickAddStudy(stxx2, "volume")
      // new CIQ.Tooltip({stx:stxx2, ohl:true, volume:true});
    })

    const stxx3 =  new CIQ.ChartEngine({
      container: this.chartContainer3,
      layout:{crosshair:true, "chartType": "candle","candleWidth": 8}
    })
    stxx3.attachQuoteFeed(this.quotefeed, {refreshInterval: 0.25});
    stxx3.newChart("WVRL", this.chartData, null, () => {
      STX.Studies.quickAddStudy(stxx3, "ma" , {"Period":20,"Field":"Close","Type":"ema"}, {"MA":"#0000FF"})
      STX.Studies.quickAddStudy(stxx3, "ma" , {"Period":50,"Field":"Close","Type":"ema"}, {"MA":"#00FF00"})
      STX.Studies.quickAddStudy(stxx3, "volume")
      // new CIQ.Tooltip({stx:stxx3, ohl:true, volume:true});
    })

    const stxx4 =  new CIQ.ChartEngine({
      container: this.chartContainer4,
      layout:{crosshair:true, "chartType": "candle","candleWidth": 8}
    })
    stxx4.attachQuoteFeed(this.quotefeed, {refreshInterval: 0.25});
    stxx4.newChart("WVRL", this.chartData, null, () => {
      STX.Studies.quickAddStudy(stxx4, "ma" , {"Period":20,"Field":"Close","Type":"ema"}, {"MA":"#0000FF"})
      STX.Studies.quickAddStudy(stxx4, "ma" , {"Period":50,"Field":"Close","Type":"ema"}, {"MA":"#00FF00"})
      STX.Studies.quickAddStudy(stxx4, "volume")
      // new CIQ.Tooltip({stx:stxx4, ohl:true, volume:true});
    })
  }
  render() {
    this.chartData = [...this.props.store.chartData]
    return (
      <div className="multipleChartIQDemo">
        <div className="chartIQDemo1" ref={this.getChartContainer1}></div>
        <div className="chartIQDemo2" ref={this.getChartContainer2}></div>
        <div className="chartIQDemo3" ref={this.getChartContainer3}></div>
        <div className="chartIQDemo4" ref={this.getChartContainer4}></div>
      </div>
    )
  }
}
export default MultipleChartIQ;