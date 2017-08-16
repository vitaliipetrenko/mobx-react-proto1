import baseIndicator from "react-stockcharts/lib/indicator/baseIndicator"
import { merge } from "react-stockcharts/lib/utils"
import { rebind } from "d3fc-rebind"

import simple from "./simple.algorithm"

const ALGORITHM_TYPE = "Simple Indicator";

export default () => {
  const base = baseIndicator();
  base.type(ALGORITHM_TYPE);
  base.accessor(data => data.simple);
  base.tooltipLabel(() => ALGORITHM_TYPE);

  const underlyingAlgorithm = simple();
  const mergedAlgorithm = merge().algorithm(underlyingAlgorithm).merge((datum, indicator) => {
		datum.simple = indicator;
  });
  const indicator = (data) => mergedAlgorithm(data);

  rebind(indicator, base, "id", "accessor", "stroke", "fill", "echo", "type", "tooltipLabel");
  rebind(indicator, underlyingAlgorithm, "shift", "windowSize", "sourcePath");
  rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");

  return indicator;
}
