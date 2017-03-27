import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import DataWrapper from './DataWrapper'
import Protected from './Protected'

@observer @DataWrapper @Protected @inject("store")
export default class Subitem extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store;

	}
	render() {
		console.log('props: ', this.props);
		return (
			<div className="page post">
				<Link to="/posts">&larr; Back to Posts</Link>
				{!!this.store.item && (
					<article>
						<h1>{this.store.items.name}</h1>
						<p>{this.store.item.body}</p>
					</article>
				)}

			</div>
		)
	}
}
