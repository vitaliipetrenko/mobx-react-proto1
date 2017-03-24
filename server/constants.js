const ORDER_TYPES = {
  BID: 'Bid',
  ASK: 'Ask',
};
const OPTION_TYPES = {
  CALL: 'Call',
  PUT: 'Put',
};
const ORDER_TYPES_VALUES = [ORDER_TYPES.BID, ORDER_TYPES.ASK];
const OPTION_TYPES_VALUES = [OPTION_TYPES.CALL, OPTION_TYPES.PUT];
const TICKER_CHARS_RANGE = [65, 90]; // From A to Z

module.exports = {
  ORDER_TYPES,
  OPTION_TYPES,
  ORDER_TYPES_VALUES,
  OPTION_TYPES_VALUES,
  TICKER_CHARS_RANGE,
};
