import React, { Component, PropTypes, PureComponent } from 'react'

import { MosaicWindow } from 'react-mosaic-component';


export default class Tolbar extends MosaicWindow {
  // static contextTypes = {
  //   mosaicActions: PropTypes.object,
  //   mosaicId: PropTypes.string,
  //   getMosaicPath: PropTypes.func,
  //   expand: PropTypes.func,
  //   mosaicWindowActions: PropTypes.object,
  //   MosaicTileContext: PropTypes.object,
  // };
  // constructor(props, context) {
  //   super(props)
  //   console.log('context: ', context.mosaicActions.expand(context.getMosaicPath(), 100))
  // }

  // clickHandler = () => {
  //   con
  // }


  renderToolbar() {
    return (
      <div>
        Toolbar
      </div>
    )
  }
}