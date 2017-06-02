import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
// import {computed} from 'mobx';
// import { Match, Link } from 'react-router-dom'

import Protected from '../Protected'
import DataWrapper from '../DataWrapper'
// import CandleChart from './chart'
// import AreaChart from './chart1'
// import LineChart from './chart2'

// import { defaultCellRangeRenderer, Grid, AutoSizer } from 'react-virtualized'

import ReactDataGrid from 'react-data-grid'

import { DraggableHeader } from 'react-data-grid-addons'

const DraggableContainer = DraggableHeader.DraggableContainer;

// console.log('DraggableContainer: ', DraggableContainer)

import 'bootstrap/dist/css/bootstrap.css'

// import 'react-virtualized/styles.css'
const { Row } = ReactDataGrid

@observer
class RowRenderer extends Row {}

@DataWrapper
@observer
export default class DataGrid extends PureComponent {
  static propTypes = {
    store: PropTypes.shape({
      items: PropTypes.object,
      chartData: PropTypes.object
    })
  };

  constructor (props) {
    super(props)
    
    this.createRows();
    this.state = {
      columns: [
        { key: 'id', name: 'ID', formatter: this.formatterFn, resizable: true },
        { key: 'expirationDate', name: 'expiration Date' },
        { key: 'optionType', name: 'option Type' },
        { key: 'orderType', name: 'order Type' },
        { key: 'price', name: 'Price' },
        { key: 'strike', name: 'Strike' },
        { key: 'ticker', name: 'Ticker' },
        { key: 'volume', name: 'Volume' },
        ]
    };
      

  }

  formatterFn = (props) => {
    return (<span>{props.value}</span>)
  }

  createRows() {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this._rows = rows;
  }

  rowGetter = (i) => {
    return this.props.store.items[i];
  }


  onHeaderDrop = (source, target) => {

    const columnsCopy = this.state.columns
    const columnSourceIndex = this.state.columns.findIndex(
      i => i.key === source
    )

    const columnTargetIndex = this.state.columns.findIndex(
      i => i.key === target
    )

    this.state.columns.splice(
      columnTargetIndex,
      0,
      this.state.columns.splice(columnSourceIndex, 1)[0]
    )

    const emptyColumns = Object.assign({}, this.state, { columns: [] })
    this.setState(
      emptyColumns
    )

    const reorderedColumns = Object.assign({}, this.state, { columns: columnsCopy })
    this.setState(
      reorderedColumns
    )

  }

	render() {
    const {items, chartData} = this.props.store;
    const { className } = this.props
    // console.log('minHeight: ', minHeight)
    // let height;
    // if (minHeight === 'auto') {
    //   height = 300
    // } else {
    //   height = minHeight - 40
    // }
    // console.log('height: ', height)
		return (
			<div>
        {items.length &&
              <ReactDataGrid
                className={"grid " + className}
                columns={this.state.columns}
                rowGetter={this.rowGetter}
                rowsCount={this._rows.length}
                minHeight={480}
                rowRenderer={RowRenderer}
              />
        }
			</div>
		)
	}
}
