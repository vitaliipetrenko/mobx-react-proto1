import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import { Match, Link } from 'react-router-dom'

import Protected from './Protected'
import DataWrapper from './DataWrapper'

import { defaultCellRangeRenderer, Grid, AutoSizer } from 'react-virtualized'

import 'react-virtualized/styles.css'

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
    // console.log(rowItem[keys[columnIndex]]);
    return <span key={key} style={style}>{rowItem[keys[columnIndex]]}</span>
  };

  _getColumnWidth = ({ index }) => {
    switch (index) {
      case 0:
        return 310
      case 1:
        return 100
      case 2:
        return 100
      case 3:
        return 100
      default:
        return 70
    }
  }
  onRend = (props) =>{
    console.log('rowOverscanStopIndex :', props.rowOverscanStopIndex);
    
  }

	render() {
    const {items} = this.props.store;

		return (
			<div className="page posts">
				<h1>Grid</h1>
				<hr />
				 {/*<CustomizedGrid cellRenderer={cellRenderer} /> */}
        {items.length && 
          <AutoSizer>
            {({ width, height }) => (
              <Grid
                onSectionRendered={this.onRend}
                cellRenderer={this.cellRenderer}
                columnCount={Object.keys(items[0]).length}
                columnWidth={this._getColumnWidth}
                height={height}
                rowCount={items.length}
                rowHeight={30}
                width={width}
              />
            )}
        </AutoSizer>
      }

			</div>
		)
	}
}
