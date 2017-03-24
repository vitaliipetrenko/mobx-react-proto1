import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import { Match, Link } from 'react-router-dom'

import { defaultCellRangeRenderer, Grid } from 'react-virtualized'

const list = [
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125],
  ['Brian Vaughn', 'Software Engineer', 'San Jose', 'CA', 95125]
  // And so on...
];

const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
	console.log('columnIndex, key, rowIndex, style',columnIndex, key, rowIndex, style)
  return (
    <div
      key={key}
      style={style}
    >
      {list[rowIndex][columnIndex]}
    </div>
  )  
}

const CustomizedGrid = (props) => {
  return (
    <Grid
			cellRenderer={cellRenderer}
			columnCount={list[0].length}
			columnWidth={100}
			height={300}
			rowCount={list.length}
			rowHeight={30}
			width={900}
		/>
  )
}

import Protected from './Protected'
import DataWrapper from './DataWrapper'

import 'react-virtualized/styles.css'

@DataWrapper @observer @inject("store")
export default class Subpage extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store
	}
	render() {
		return (
			<div className="page posts">
				<h1>Grid</h1>
				<hr />
				<CustomizedGrid />
				<ul>
					{this.store.items && this.store.items.length ? this.store.items.map((post, key) => {
						console.log('post: ', post);
						return <li key={key}>
						<h4>Ticker: {post.ticker}</h4>
						<p>Expiration Date: {post.expirationDate}</p>
						<p>Option Type: {post.optionType}</p>
						<p>Order Type: {post.orderType}</p>
						<p>Price: {post.price}</p>
						<p>Strike: {post.strike}</p>
						<p>Volume: {post.volume}</p>
						</li>
					}) : 'Loading...'}
				</ul>
			</div>
		)
	}
}