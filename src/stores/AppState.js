import { observable, action, runInAction } from 'mobx'
import axios from 'axios'

class AppState {
  @observable authenticated = false;
  @observable authenticating = false;
  @observable items = [];
  @observable chartData = [];
  @observable item = {};

  // constructor() {
  //   this.authenticated = false;
  //   this.authenticating = false;
  //   this.items = [];
  //   this.item = {};
  // }


  async fetchData(next) {
    const limit = 300;
    const offset = 300;
    const APIURL = `http://localhost:3000/?limit=${limit}`;

    // let {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
    let {data} = await axios.get(APIURL)
    // data = data.results;

    // data.length > 0 ? this.setData(data) : this.setSingle(data)
    this.setOrders(data || []);

    next();
  }

  async fetchChartData() {
    const APIURL = window.location.search.indexOf('random') >= 0 ? 'http://localhost:3000/chart-random' : 'http://localhost:3000/chart';

    let {data} = await axios.get(APIURL)
    data.forEach((el) => {
      el.date = new Date(el.date)
      el.Date = new Date(el.date)
      el.Open = el.open
      el.Close = el.close
      el.High = el.high
      el.Low = el.low
      el.Volume = el.volume
    })
    runInAction(() => this.chartData.replace(data))
  }

  async fetchNextData(pathname, id) {
    const limit = 300;
    const offset = 300;
    const APIURL = `http://localhost:3000/?limit=${limit}&offset=${offset}`;

    // let {data} = await axios.get(`https://jsonplaceholder.typicode.com${pathname}`)
    let {data} = await axios.get(APIURL)
    // data = data.results;

    try {
      let {data} = await axios.get(APIURL)
      // this.setOrders(data);
      runInAction(() => this.items.replace(data))
    } catch (e) {
      // this.setOrders([]);
      runInAction(() => this.items.replace([]))
    }

    next();
  }

  @action setOrders(data) {
    // this.items = data.map(item => new OrderModel(item));
    this.items.replace(data);
  }
  @action setChartData(data) {
    this.chartData.replace(data);
  }
  @action updateChart() {
    const chartData = this.chartData
    if (chartData.length) {
      const last = chartData[chartData.length - 1]
      let currentMiddle = last.open
      let close = Math.random() < 0.5 ? last.open * 0.99 : last.open * 1.01
      last.close = close
      last.high = Math.max(currentMiddle, close) * 1.035
      last.low = Math.min(currentMiddle, close) * 0.984
      last.volume = last.volume + (Math.random() * 10)
    }
  }

  @action setData(data) {
    this.items = data
  }

  @action setSingle(data) {
    this.item = data
  }

  @action clearItems() {
    this.chartData = []
    this.items = []
    this.item = {}
  }

  @action authenticate() {
    return new Promise((resolve,reject) => {
          this.authenticating = true
          setTimeout(() => {
            this.authenticated = !this.authenticated
            this.authenticating = false
            resolve(this.authenticated)
        }, 0)
    })
  }

}

export default AppState;
