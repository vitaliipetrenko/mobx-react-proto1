import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Link } from 'react-router-dom'
import ActiveLink from './ui/Activelink';

@inject("store") @observer
export default class TopNav extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store
	}

	authenticate(e) {
		if (e) e.preventDefault();
		this.props.store.authenticate()
	}

	render() {
		const { authenticated, authenticating } = this.store
		return (
			<nav>
				<ActiveLink activeOnlyWhenExact={true} to="/">Home</ActiveLink>
				{authenticated && <ActiveLink to="/posts">People</ActiveLink>}
				{authenticated && <ActiveLink to="/grids">4 Grids</ActiveLink>}
				{authenticated && <ActiveLink to="/grid">1 Grid</ActiveLink>}
				{<ActiveLink to="/charts">Charts</ActiveLink>}
				{<ActiveLink to="/multi-charts">MultiCharts</ActiveLink>}
				{<ActiveLink to="/chartiq">ChartIQ</ActiveLink>}
				{<ActiveLink to="/multi-chartiq">Multiple ChartIQ</ActiveLink>}
				{authenticated && <ActiveLink to="/data-grid">Data Grid</ActiveLink>}
				{authenticated && <ActiveLink to="/ag-grid">Ag Grid</ActiveLink>}
			</nav>
		)
	}

}