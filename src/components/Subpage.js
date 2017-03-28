import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'
import {computed} from 'mobx';
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

// const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
//   return (
//     <div
//       key={key}
//       style={style}
//     >
//       {list[rowIndex][columnIndex]}
//     </div>
//   )
// }

@DataWrapper
@observer
export default class Subpage extends Component {
  static propTypes = {
    store: PropTypes.shape({
      items: PropTypes.object
    })
  };

  cellRenderer = (items) => ({ columnIndex, key, rowIndex, style }) => {
    const rowItem = items[rowIndex];
    const keys = Object.keys(rowItem);

    // console.log('rerender row');

    return <span key={key} style={style}>{rowItem[keys[columnIndex]]}</span>
  };

	render() {
    const {items} = this.props.store;
    // console.log('subpage render');
		return (
			<div className="page posts">
				<h1>Grid</h1>
				<hr />
				{/* <CustomizedGrid cellRenderer={cellRenderer} /> */}
        {items.length && <Grid
          cellRenderer={this.cellRenderer(items)}
          columnCount={Object.keys(items[0]).length}
          columnWidth={100}
          height={300}
          rowCount={items.length}
          rowHeight={30}
          width={900}
        />}
			</div>
		)
	}
}
