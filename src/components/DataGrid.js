import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapper from './DataWrapper'
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
export default class DataGrid extends Component {
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
        { key: 'id', name: 'ID', formatter: this.formatterFn, draggable: true, resizable: true },
        { key: 'expirationDate', name: 'expiration Date', draggable: true },
        { key: 'optionType', name: 'option Type', draggable: true },
        { key: 'orderType', name: 'order Type', draggable: true },
        { key: 'price', name: 'Price', draggable: true },
        { key: 'strike', name: 'Strike', draggable: true },
        { key: 'ticker', name: 'Ticker', draggable: true },
        { key: 'volume', name: 'Volume', draggable: true },
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
		return (
			<div className="page">
				<h1>Grid</h1>
				<hr />
        {items.length &&
          <div className="grids">
            <div className="grid grid1">
              <DraggableContainer
              onHeaderDrop={this.onHeaderDrop}>
                <ReactDataGrid
                  columns={this.state.columns}
                  rowGetter={this.rowGetter}
                  rowsCount={this._rows.length}
                  minHeight={300}
                  rowRenderer={RowRenderer}
                />
              </DraggableContainer>
            </div>
            <div className="grid grid2">
              <DraggableContainer
              onHeaderDrop={this.onHeaderDrop}>
                <ReactDataGrid
                  columns={this.state.columns}
                  rowGetter={this.rowGetter}
                  rowsCount={this._rows.length}
                  minHeight={300}
                  rowRenderer={RowRenderer}
                />
              </DraggableContainer>
            </div>
            <div className="grid grid3">
              <DraggableContainer
              onHeaderDrop={this.onHeaderDrop}>
                <ReactDataGrid
                  columns={this.state.columns}
                  rowGetter={this.rowGetter}
                  rowsCount={this._rows.length}
                  minHeight={300}
                  rowRenderer={RowRenderer}
                />
              </DraggableContainer>
            </div>
            <div className="grid grid4">
              <DraggableContainer
              onHeaderDrop={this.onHeaderDrop}>
                <ReactDataGrid
                  columns={this.state.columns}
                  rowGetter={this.rowGetter}
                  rowsCount={this._rows.length}
                  minHeight={300}
                  rowRenderer={RowRenderer}
                />
              </DraggableContainer>
            </div>
          </div>
        }
			</div>
		)
	}
}
