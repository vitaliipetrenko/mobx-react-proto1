import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { action } from 'mobx'
import { Redirect } from 'react-router-dom'

export default function DataWrapper(Component) {
	@inject(['store'])
	class DataFetcher extends Component {
		constructor(props) {
			super(props)
			this.timeout = 250;
			// this.store = this.props.store
		}

		componentWillMount() {
			this.pollData();
			this.props.store.fetchChartData()
		}

		componentDidMount() {
			// console.log(this.props)
			// let pathname = this.props.match.url
			// let id = this.props.match.id ? this.props.match.id : null
			// this.store.fetchData(pathname, id)
		}

		componentWillUnmount() {
			clearTimeout(this.timer);
			this.timer = undefined;
			this.props.store.clearItems()
		}

		pollData() {
			// this.props.store.fetchData();
			this.timer = setInterval(() => {
				this.props.store.updateChart()
			 },
			this.timeout);
		}

		render() {
			return <Component {...this.props} />
		}

	}
	return DataFetcher
}
