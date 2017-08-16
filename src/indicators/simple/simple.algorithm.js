export default () => {
    let shift;
    let windowSize;
    let sourcePath;

    const calculator = (data) => data.map(d => d.close - shift);

    calculator.shift = (p) => {
        if (!p) {
            return shift;
        }
        shift = p;
        return calculator;
    }

    calculator.windowSize = (p) => {
        if (!p) {
            return windowSize;
        }
        windowSize = p;
        return calculator;
    }

    calculator.sourcePath = (p) => {
        if (!p) {
            return sourcePath;
        }
        sourcePath = p;
        return calculator;
    }

    return calculator;
}
