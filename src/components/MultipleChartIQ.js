import React, { Component } from 'react'
import mobx from 'mobx'
import { inject } from 'mobx-react'

@inject('store')
class MultipleChartIQ extends Component {
  constructor (props) {
    super(props)
    this.props.store.fetchChartData()
    this.state = {
      stxx1: null,
      stxx2: null,
      stxx3: null,
      stxx4: null,
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
      stxx1: new CIQ.ChartEngine({container:$$$(".chartIQDemo1"),layout:{crosshair:true}}),
      stxx2: new CIQ.ChartEngine({container:$$$(".chartIQDemo2"),layout:{crosshair:true}}),
      stxx3: new CIQ.ChartEngine({container:$$$(".chartIQDemo3"),layout:{crosshair:true}}),
      stxx4: new CIQ.ChartEngine({container:$$$(".chartIQDemo4"),layout:{crosshair:true}})
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
      this.state.stxx1.newChart("WVRL", this.state.chartData, null, () => {
        STX.Studies.quickAddStudy(this.state.stxx1, "ma"),
        STX.Studies.quickAddStudy(this.state.stxx1, "volume")
      })
      this.state.stxx2.newChart("WVRL", this.state.chartData, null, () => {
        STX.Studies.quickAddStudy(this.state.stxx2, "ma"),
        STX.Studies.quickAddStudy(this.state.stxx2, "volume")
      })
      this.state.stxx3.newChart("WVRL", this.state.chartData, null, () => {
        STX.Studies.quickAddStudy(this.state.stxx3, "ma"),
        STX.Studies.quickAddStudy(this.state.stxx3, "volume")
      })
      this.state.stxx4.newChart("WVRL", this.state.chartData, null, () => {
        STX.Studies.quickAddStudy(this.state.stxx4, "ma"),
        STX.Studies.quickAddStudy(this.state.stxx4, "volume")
      })
    })
    }
  }
  render() {
      return (
        <div className="multipleChartIQDemo">
          <div className="chartIQDemo1"></div>
          <div className="chartIQDemo2"></div>
          <div className="chartIQDemo3"></div>
          <div className="chartIQDemo4"></div>
        </div>
      )
  }
}
export default MultipleChartIQ;