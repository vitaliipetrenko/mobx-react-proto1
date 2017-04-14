import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapperChart from './DataWrapperChart'
import StockChartXComponent from './StockChartXComponent'
import { AutoSizer } from 'react-virtualized'

@DataWrapperChart
@observer
export default class StockChartXPage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      chartData: PropTypes.object
    })
  };

	render() {
		return (
			<div className="page posts">
        <StockChartXComponent store={this.props.store} width={1850} height={980} />
			</div>
		)
	}
}
