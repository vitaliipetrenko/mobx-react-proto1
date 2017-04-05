import React, { Component } from 'react'
import mobx from 'mobx'
import { inject } from 'mobx-react'
console.log(CIQ.Studies.getStudyList())
@inject('store')
class ChartIQDemo extends Component {
  constructor (props) {
    super(props)
    this.props.store.fetchChartData()
    this.state = {
      stxx: null,
      chartData: this.props.store.chartData
    }
  }
  onComponentWillRecieveProps(nextProps) {
    this.setState({
      chartData: this.props.store.chartData
    })
  }
  componentDidMount() {
    this.setState({
      stxx: new CIQ.ChartEngine({container:$$$(".chartIQDemo"),layout:{crosshair:true, "chartType": "candle","candleWidth": 8}})
    })
    this.timer = setInterval(this.update, 250)
  }
  componentWillUnmount() {
			clearInterval(this.timer)
  }

  update = () => {
    const chartData = this.state.chartData
    if (chartData.length) {
      const last = chartData[chartData.length - 1]
      let currentMiddle = last.Open
      let Close = Math.random() < 0.5 ? last.Open * 0.99 : last.Open * 1.01
      last.Close = Close
      last.High = Math.max(currentMiddle, Close) * 1.035
      last.Low = Math.min(currentMiddle, Close) * 0.984
      last.Volume = last.Volume + (Math.random() * 10)

      this.setState({
        chartData: [...chartData.slice(0, chartData.length - 1), last]
      }, () => {
        this.state.stxx.newChart("WVRL", this.state.chartData, null, () => {
          STX.Studies.quickAddStudy(this.state.stxx, "ma" , {"Period":20,"Field":"Close","Type":"ema"}, {"MA":"#0000FF"})
          STX.Studies.quickAddStudy(this.state.stxx, "ma" , {"Period":50,"Field":"Close","Type":"ema"}, {"MA":"#00FF00"})
          STX.Studies.quickAddStudy(this.state.stxx, "volume")
          new CIQ.Tooltip({stx:this.state.stxx, ohl:true, volume:true});
        })
    })
    }
  }
  render() {
      return (
        <div className="chartIQDemo"></div>
      )
  }
}
export default ChartIQDemo;