import React, { Component, PropTypes, PureComponent } from 'react'
import { inject, observer } from 'mobx-react'

// import { Mosaic } from 'react-mosaic-component'

import {
    MosaicWindow,
    Corner,
    createBalancedTreeFromLeaves,
    getLeaves,
    getNodeAtPath,
    getOtherDirection,
    getPathToCorner,
    MosaicFactory,
    MosaicNode,
    MosaicParent,
    MosaicWindowFactory,
    MosaicZeroStateFactory,
    updateTree,
    Mosaic,
    MosaicWithoutDragDropContext
    // MosaicWindowContext
} from 'react-mosaic-component';

// console.log('MosaicWithoutDragDropContext: ', MosaicWithoutDragDropContext)

import * as _ from 'lodash';

import Protected from './Protected'

import '../../node_modules/@blueprintjs/core/dist/blueprint.css';

import '../../node_modules/react-mosaic-component/react-mosaic-component.css'

import Grids from '../components/Grids/Grids'
import DataGrid from '../components/DataGrid/DataGrid'

import Toolbar from '../components/Toolbar/Toolbar'


class ElementMosaic extends Mosaic { }

let windowCount = 9;

@observer
export default class MosaicPage extends Component {


    // static contextTypes = {
    //     mosaicActions: PropTypes.func,
    //     mosaicId: PropTypes.func,
    //     getMosaicPath: PropTypes.func,
    //     mosaicWindowActions: PropTypes.func,
    // };

  constructor (props, context) {
    super(props)

    this.state = {
        currentNode: createBalancedTreeFromLeaves(_.range(1, windowCount + 1))
    }
    // console.log('this.state.currentNode: ', this.state.currentNode)
    this.divElement = []
  }



  onChange = (currentNode) => {
    // console.log('currentNode: ', currentNode)
    this.setState({ currentNode })

    // const element = this.divElement[1]
    // const tileEl = this.divElement[1].parentNode;
    // const clientHeight = tileEl.clientHeight;
    // const innerHeight = tileEl.innerHeight;
    // const height = tileEl.height;
    // const offsetHeight = tileEl.offsetHeight;
  }

  remove = () => this.context.mosaicActions.remove(this.context.getMosaicPath());

  createNode = () => ++windowCount

  autoArrange = () => {
    const leaves = getLeaves(this.state.currentNode)

    this.setState({
        currentNode: createBalancedTreeFromLeaves(leaves)
    });
  };


    cleanValue = {
        direction: 'row',
        first: {
            direction: 'column',
            first: 1,
            second: {
                direction: "column",
                first: 2,
                second: 3,
            },
            splitPercentage: 15
        },
        second: {
            direction: 'column',
            first: {
                direction: "row",
                first: 4,
                second: 5,
            },
            second: {
                direction: 'column',
                first: {
                    direction: "row",
                    first: {
                        direction: "row",
                        first: 6,
                        second: 7,
                    },
                    second: 8,
                    splitPercentage: 60
                },
                second: 9,
                splitPercentage: 30
            },
            splitPercentage: 20
        },
        splitPercentage: 18
    }

  addToTopRight = () => {
    let { currentNode } = this.state;
      if (currentNode) {
          const path = getPathToCorner(currentNode, Corner.TOP_RIGHT)
          const parent = getNodeAtPath(currentNode, _.dropRight(path))
          const destination = getNodeAtPath(currentNode, path)
          const direction = parent ? getOtherDirection(parent.direction) : 'row'

          let first
          let second
          if (direction === 'row') {
              first = destination
              second = ++windowCount
          } else {
              first = ++windowCount
              second = destination
          }

          currentNode = updateTree(currentNode, [{
              path,
              spec: {
                  $set: {
                      direction, first, second,
                  },
              },
          }])
      } else {
          currentNode = ++windowCount
      }

      this.setState({ currentNode })
  }

  render() {
    const ModulesBtn = () => {
        return (
            <div className='pt-button-group'>
                <button className='pt-button'>Symbol Summary</button>
            </div>
        )
    };
    const HelpBtn = () => {
        return (
            <div className='pt-button-group'>
                <button className='pt-button'>Submit Feedback</button>
            </div>
        )
    };
    const TITLE_MAP = {
      1: <div>Top Left Window</div>,
      2: <div>Bottom Left Window</div>,
      3: <div>Top Right Window</div>,
      4: <div>Bottom Right Window</div>,
    };
    const COMPONENTS = {
        1: <DataGrid className="grid1" />,
        2: <DataGrid className="grid2" />,
        3: <DataGrid className="grid3" />,
        4: <DataGrid className="grid4" />,
        5: <DataGrid className="grid5" />,
        6: <DataGrid className="grid6" />,
        7: <DataGrid className="grid7" />,
        8: <DataGrid className="grid8" />,
        9: <DataGrid className="grid9" />
    }
    
    return (
            <Mosaic
                renderTile={ id => (
                    <MosaicWindow
                        additionalControls={[<ModulesBtn key={1}/>, <HelpBtn key={2} />]}
                        createNode={ () => 'new' }
                        title={`Window ${id}`}
                        draggable
                        additionalControlButtonText='Help'
                    >
                        <div
                        className="example-window">
                          {COMPONENTS[id]}
                        </div>
                        
                    </MosaicWindow>
                    )}
                    initialValue={this.cleanValue}
                    onChange={this.onChange}
                    resize={10}

          />
    )
  }
}
