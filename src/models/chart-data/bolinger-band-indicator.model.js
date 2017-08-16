
import React from 'react'
import {
  BollingerSeries
} from 'react-stockcharts/lib/series'
import {
  bollingerBand
} from "react-stockcharts/lib/indicator";

export const bolingerBandIndicatorModel = {
  label: 'Bolinger Band',
  calculators: [bollingerBand()],
  components: [<BollingerSeries key={1} />]
}
