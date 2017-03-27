import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapper from './DataWrapper'

import { defaultCellRangeRenderer, Grid } from 'react-virtualized'

import 'react-virtualized/styles.css'

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
			cellRenderer={props.cellRenderer}
			columnCount={list[0].length}
			columnWidth={100}
			height={300}
			rowCount={list.length}
			rowHeight={30}
			width={900}
		/>
  )
}

@DataWrapper
export default class Subpage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      items: PropTypes.object
    })
  };

  cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const {items} = this.props.store;
    const rowItem = items[rowIndex];
    const keys = Object.keys(rowItem);
    console.log(rowItem[keys[columnIndex]]);
    return <span key={key} style={style}>{rowItem[keys[columnIndex]]}</span>
  };

	render() {
    const {items} = this.props.store;

		return (
			<div className="page posts">
				<h1>Grid</h1>
				<hr />
				{/* <CustomizedGrid cellRenderer={cellRenderer} /> */}
        {items.length && <Grid
          cellRenderer={this.cellRenderer}
          columnCount={Object.keys(items[0]).length}
          columnWidth={100}
          height={300}
          rowCount={items.length}
          rowHeight={30}
          width={900}
        />}
				<ul>
					{this.props.store.items && this.props.store.items.length ? this.props.store.items.map((post, key) => {
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
