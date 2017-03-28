function createChartPool () {
  const end = new Date()
  let current = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0)

  const data = []

  let currentMiddle = 150

  while (current < end) {
    let close = Math.random() < 0.3 ? currentMiddle * 0.99 : currentMiddle * 1.001
    data.push({
      data: current,
      open: currentMiddle,
      close,
      high: Math.max(currentMiddle, close) * 1.035,
      low: Math.min(currentMiddle, close) * 0.984,
      volume: Math.random() * 100000
    })
    currentMiddle = close
    current = new Date(current.getTime() + (1000 * 60))
  }

  return data;
}

module.exports = createChartPool
