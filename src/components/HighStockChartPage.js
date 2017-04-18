import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import HighStockChart from './HighStockChart'
import { AutoSizer } from 'react-virtualized'

@inject('store')
@observer
export default class HighStockChartPage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      chartData: PropTypes.object
    })
  };

	render() {
		return (
			<div className="page posts">
        <HighStockChart store={this.props.store} width={1850} height={980} />
			</div>
		)
	}
}
