import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapperChart from './DataWrapperChart'
import CandleChart from './CandleChart'


@observer
@DataWrapperChart
// @inject('store')
export default class MultiChartsPage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      chartData: PropTypes.object
    })
  };

	render() {
    const chartData = this.props.store.chartData
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
