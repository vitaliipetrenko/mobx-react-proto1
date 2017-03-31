function createChartPool (endMiddle = false) {
  const now = new Date()
  let current = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30, 0)
  let end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endMiddle ? 13 : 16, 0, 0)
  const data = []

  let currentMiddle = 150

  while (current < end) {
    let close = Math.random() < 0.5 ? currentMiddle * 0.99 : currentMiddle * 1.01
    data.push({
      date: current,
      open: currentMiddle,
      close,
      high: Math.max(currentMiddle, close) * 1.0035,
      low: Math.min(currentMiddle, close) * 0.9984,
      volume: Math.random() * 100000
    })
    currentMiddle = close
    current = new Date(current.getTime() + (1000 * 60))
  }

  return data;
}
function updateChartData(chartData) {
  const last = chartData[chartData.length - 1]

  let currentMiddle = last.open
  let close = Math.random() < 0.5 ? last.open * 0.99 : last.open * 1.01
  last.close = close
  last.high = Math.max(currentMiddle, close) * 1.035
  last.low = Math.min(currentMiddle, close) * 0.984
  last.volume = last.volume + (Math.random() * 10)

  return chartData
}
module.exports = {
  createChartPool,
  updateChartData
}
