const moment = require('moment');
const constants = require('./constants');

const {
  // ORDER_TYPES,
  // OPTION_TYPES,
  ORDER_TYPES_VALUES,
  OPTION_TYPES_VALUES,
  TICKER_CHARS_RANGE,
} = constants;

function rnd(max = 1, min = 0) {
  return (Math.random() * (max - min)) + min;
}

function rndInt(max = 2, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomTicker(l = 4) {
  let ticker = '';
  while (ticker.length < l) {
    ticker += String.fromCharCode(rndInt(TICKER_CHARS_RANGE[1], TICKER_CHARS_RANGE[0]));
  }
  return ticker;
}

function randomPrice(avg = 10, range = 0.1, n) {
  const halfRange = (avg * range) / 2;

  return parseFloat(rnd(avg + halfRange, Math.max(0, avg - halfRange)).toFixed(n));
}

function randomDate(after = Date.now(), beforeOptional) {
  const momentAfter = moment(after);
  const before = beforeOptional || moment(after).month(momentAfter.month() + 1);
  const beforeStamp = moment(before).valueOf();

  return moment(rndInt(beforeStamp, momentAfter.valueOf())).format('YYYY-MM-DD');
}

function randomOrderType() {
  return ORDER_TYPES_VALUES[rndInt(ORDER_TYPES_VALUES.length)];
}

function randomOptionType() {
  return OPTION_TYPES_VALUES[rndInt(OPTION_TYPES_VALUES.length)];
}

function getTickersPool(l = 5) {
  const pool = Array.from(Array(l));

  return pool.map(randomTicker);
}

module.exports = {
  rnd,
  rndInt,
  randomTicker,
  randomPrice,
  randomDate,
  randomOrderType,
  randomOptionType,
  getTickersPool,
};
