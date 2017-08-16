import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import DataWrapperChart from './DataWrapperChart'
import TestChartComponent from './TestChartComponent'

@DataWrapperChart
@observer
export default class TestChartPage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      chartData: PropTypes.object
    })
  };

	render() {
		return (
			<div className="page posts">
        <TestChartComponent store={this.props.store} width={1850} height={980} />
			</div>
		)
	}
}
