import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapper from './DataWrapper'
import CandleChart from './CandleChart'
import { AutoSizer } from 'react-virtualized'

@inject('store')
export default class MultiChartsPage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      chartData: PropTypes.object
    })
  };

  constructor (props) {
    super(props)
    this.props.store.fetchChartData()
    this.state = {
      chartData: this.props.store.chartData
    }
  }
  onComponentWillRecieveProps(nextProps) {
    this.setState({
      chartData: this.props.store.chartData
    })
  }
  componentDidMount() {
    this.timer = setInterval(this.update, 250)
  }
  componentWillUnmount() {
			clearInterval(this.timer);
  }

  update = () => {
    const chartData = this.state.chartData
    if (chartData.length) {
      const last = chartData[chartData.length - 1]
      let currentMiddle = last.open
      let close = Math.random() < 0.5 ? last.open * 0.99 : last.open * 1.01
      last.close = close
      last.high = Math.max(currentMiddle, close) * 1.035
      last.low = Math.min(currentMiddle, close) * 0.984
      last.volume = last.volume + (Math.random() * 10)

      this.setState({
        chartData: [...chartData.slice(0, chartData.length - 1), last]
      })
    }
  }

	render() {
    const {chartData} = this.state;
    const staticData = this.props.store.chartData
		return (
			<div className="page posts" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        <CandleChart chartData={chartData} width={900} height={480} />
        <CandleChart chartData={chartData} width={900} height={480} />
        <CandleChart chartData={chartData} width={900} height={480} />
        <CandleChart chartData={chartData} width={900} height={480} />
			</div>
		)
	}
}
