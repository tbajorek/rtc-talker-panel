const toHex = (input) => (input+0x100).toString(16).substr(-2).toUpperCase();

const calcValueOfDescEdge = (input) => (1.0+Math.cos((input/100)*Math.PI))/2.0;
const calcValueOfAscEdge = (input) => (1.0+Math.cos((1.0-(input/100))*Math.PI))/2.0;

const heatmapBar = (percent) => {
    const input = Math.max(0, Math.min(percent, 100));
    const redValue = input <= 50 ? 211 : 211 * calcValueOfDescEdge(2*(input-50));
    const red = Math.round(redValue);
    const greenValue = input <= 50 ? 211 * calcValueOfAscEdge(input*2) : 141 + 71 * calcValueOfDescEdge(2*(input-50));
    const green = Math.round(greenValue);
    const blue = 0;
    return '#' + toHex(red) + toHex(green) + toHex(blue);
};

export default heatmapBar;