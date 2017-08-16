import mobx, { observable, action } from 'mobx'

class ChartState {
  @observable currentChart

  @action setCurrentChart(chartComponent) {
    this.currentChart = chartComponent;
  }
}
export default new ChartState()
