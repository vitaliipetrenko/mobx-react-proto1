import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import HighStockChart from './HighStockChart'

@inject('store')
@observer
export default class MultiHighStockChartPage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      chartData: PropTypes.object
    })
  };

	render() {
		return (
			<div className="page posts" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        <HighStockChart store={this.props.store} width={900} height={480} />
        <HighStockChart store={this.props.store} width={900} height={480} />
        <HighStockChart store={this.props.store} width={900} height={480} />
        <HighStockChart store={this.props.store} width={900} height={480} />
			</div>
		)
	}
}
