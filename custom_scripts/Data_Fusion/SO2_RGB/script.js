//VERSION=3
var minVal = 0.0;
var maxVal = 0.01;
var diff = maxVal - minVal;
const map = [
	[minVal, 0x00007f], 
	[minVal + 0.125 * diff, 0x0000ff],
	[minVal + 0.375 * diff, 0x00ffff],
	[minVal + 0.625 * diff, 0xffff00],
	[minVal + 0.875 * diff, 0xff0000],
	[maxVal, 0x7f0000]
];

const visualizer = new ColorRampVisualizer(map);

function setup() {
  return {
    input: [
      {datasource: "S5", bands: ["SO2"]},
      {datasource: "S2", bands: ["B02", "B03", "B04"]}
    ],
    output: { bands: 3},
    mosaicking: "ORBIT"
  };
}

function evaluatePixel(samples){
  var S2 = samples.S2[0];
  var S5 = samples.S5[0];
  const [r, g, b] = visualizer.process(S5.SO2);	
  
  if (S5.SO2 > 0.0015) {
    return [r, g, b];
  } else {
    return [2.5 * S2.B04, 2.5 * S2.B03, 2.5 * S2.B02];
  }
}