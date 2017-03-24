const uuidV1 = require('uuid/v1');
const utils = require('./utils');

const {
  rndInt,
  randomPrice,
  randomDate,
  randomOrderType,
  randomOptionType,
  getTickersPool,
} = utils;

const tickers = getTickersPool();

function createOptionOrder(ticker = tickers[rndInt(tickers.length)], stockPrice = 100) {
  return {
    id: uuidV1(),
    ticker,
    price: randomPrice(stockPrice * 0.15, 0.03, 2),
    expirationDate: randomDate(),
    orderType: randomOrderType(),
    optionType: randomOptionType(),
    volume: rndInt(1000, 10),
    strike: randomPrice(stockPrice, 0.1, 2),
  };
}

function createOptionOrdersPool(l = 200) {
  const pool = Array.from(Array(l));

  return pool.map(() => createOptionOrder());
}

function modifyOptionOrdersPool(pool, p = 0.2) {
  return pool.map(order => (Math.random() < p ?
    createOptionOrder() :
    order));
}

module.exports = {
  createOptionOrder,
  createOptionOrdersPool,
  modifyOptionOrdersPool,
};
