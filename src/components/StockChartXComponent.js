import React, { Component } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react'

@observer
class StockChartXComponent extends Component {
  constructor (props) {
    super(props)
    this.getChartContainer = (container) => {
      this.container = container
    }
    this.filled = false
    autorun(() => {
      if (this.props.store.chartData.length > 0) {
        if (!this.filled) {
          this.filled = true
          this.fillData(this.props.store.chartData)
        } else {
          this.updateLast(this.props.store.chartData)
        }
      }
    })
  } 
  shouldComponentUpdate () {
    return false
  }
  fillData (chartData) {
    const dataSeries = this.chart.barDataSeries()
    for (let line of chartData) {
      dataSeries.date.add(line.date);
      dataSeries.open.add(line.open);
      dataSeries.high.add(line.high);
      dataSeries.low.add(line.low);
      dataSeries.close.add(line.close);
      dataSeries.volume.add(line.volume);            
    }
    this.chart.updateComputedDataSeries()
    this.chart.updateIndicators()
    this.chart.setNeedsUpdate(true)
  }
  updateLast (chartData) {
    const dataSeries = this.chart.barDataSeries()
    const last = chartData[chartData.length - 1]
    dataSeries.date.updateLast(last.date);
    dataSeries.open.updateLast(last.open);
    dataSeries.high.updateLast(last.high);
    dataSeries.low.updateLast(last.low);
    dataSeries.close.updateLast(last.close);
    dataSeries.volume.updateLast(last.volume);  
    this.chart.updateComputedDataSeries()
    this.chart.updateIndicators()
    this.chart.setNeedsUpdate(true)
  }

  componentDidMount() {
    var chart = new StockChartX.Chart({
        container: this.container,
        width: this.props.width,
        height: this.props.height
    });
    this.chart = chart
    chart.stateHandler
      .load()
      .then((isLoaded) => {
          if (!isLoaded) {
            var ind = chart.addIndicators(StockChartX.VolumeIndicator);
            ind.setParameterValue(StockChartX.IndicatorParam.LINE_WIDTH, 5);
          }
          chart.instrument = {
            symbol: "GOOG",
            company: "Google Inc.",
            exchange: "NASDAQ"
          }
      })
      .catch(function(error) {
          StockChartX.UI.Notification.error(error.message);
      });
      this.chart = chart
  }
  render () {
    return <div ref={this.getChartContainer}></div>
  }
}

export default StockChartXComponent