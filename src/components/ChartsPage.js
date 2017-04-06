import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapperChart from './DataWrapperChart'
import CandleChart from './CandleChart'
import { AutoSizer } from 'react-virtualized'

@DataWrapperChart
export default class ChartsPage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      chartData: PropTypes.object
    })
  };

	render() {
    const { chartData } = this.props.store;
		return (
			<div className="page posts">
        <CandleChart chartData={chartData} width={1850} height={980} />
			</div>
		)
	}
}
