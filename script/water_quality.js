//VERSION=3
function water_mask(b3, b8) {
  var NDWI = index(b3, b8);
  return NDWI > 0.15;
}

var wq = index(B04, B03);
var mask = water_mask(B03, B08);
const ramps = [
  [-0.7, 0x0000ff],
  [-0.1, 0x00ff00],
  [0.4, 0xff0000]
];
/*
const visualizer = new ColorRampVisualizer(ramps);
if (mask) return visualizer.process(wq);
else return [B04,B03,B02].map(a => a*2.5);
*/
let underflow_color = [0, 0, 1];
let low_color = [0, 1, 0];
let high_color = [1, 0 , 0];
let overflow_color = [1, 1, 1];
let min = -0.5;
let mp = -0.15;
let max = 0.0;

return colorBlend(wq, [min, mp, max],
[
	underflow_color,
	low_color,
	high_color,
	overflow_color // uncomment to see overflows
]).concat(mask*dataMask);
