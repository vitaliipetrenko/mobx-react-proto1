import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'
import DevTools from 'mobx-react-devtools'

import TopBar from './TopBar'

import '../../node_modules/ag-grid/dist/styles/ag-grid.css'
import '../../node_modules/ag-grid/dist/styles/theme-fresh.css'

@observer
export default class App extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store
	}
	componentDidMount() {
		this.authenticate()

	}
	authenticate(e) {
		if (e) e.preventDefault();
		this.props.store.authenticate()
	}
	render() {
		const { authenticated, authenticating, timeToRefresh, refreshToken } = this.store
		return (
			<Router>
				<Provider store={this.props.store}>
					<div className="wrapper">
						<TopBar />

						<Route
						  exact
						  path="/"
						  render={(props) => <LazyRoute {...props} component={import('./Home')} />}
						/>
						<Route
						  exact
						  path="/posts"
						  render={(props) => <LazyRoute {...props} component={import('./Subpage')} />}
						/>
						<Route
						  exact
						  path="/grids"
						  render={(props) => <LazyRoute {...props} component={import('./Grids')} />}
						/>
						<Route
						  exact
						  path="/grid"
						  render={(props) => <LazyRoute {...props} component={import('./Grid')} />}
						/>
            <Route
						  exact
						  path="/data-grid"
						  render={(props) => <LazyRoute {...props} component={import('./DataGrid')} />}
						/>
						<Route
						  exact
						  path="/ag-grid"
						  render={(props) => <LazyRoute {...props} component={import('./agGrid')} />}
						/>
						<Route
						  exact
						  path="/charts"
						  render={(props) => <LazyRoute {...props} component={import('./ChartsPage')} />}
						/>
						<Route
						  exact
						  path="/multi-charts"
						  render={(props) => <LazyRoute {...props} component={import('./MultiChartsPage')} />}
						/>
						<Route
						  exact
						  path="/stockchartx"
						  render={(props) => <LazyRoute {...props} component={import('./StockChartXPage')} />}
            />
						<Route
						  exact
						  path="/highstock"
						  render={(props) => <LazyRoute {...props} component={import('./HighStockChartPage')} />}
						/>
						<Route
						  exact
						  path="/multi-highstock"
						  render={(props) => <LazyRoute {...props} component={import('./MultiHighStockChartPage')} />}
						/>
						<Route
						  exact
						  path="/multi-stockchartx"
						  render={(props) => <LazyRoute {...props} component={import('./MultiStockChartXPage')} />}
            />
						<Route
						  exact
						  path="/posts/:id"
						  render={(props) => <LazyRoute {...props} component={import('./Subitem')} />}
						/>
						<Route
						  exact
						  path="/login"
						  render={(props) => <LazyRoute {...props} component={import('./Login')} />}
						/>
						<Route
							exact
							path="/mosaic-page"
							render={(props) => <LazyRoute {...props} component={import('./MosaicPage')} />}
						/>
						{!!(timeToRefresh && timeToRefresh <= 4) && this.store.refreshToken()}
					</div>
				</Provider>
			</Router>
		)
	}
}
