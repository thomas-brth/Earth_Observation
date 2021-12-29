//VERSION=3
function water_mask() {
  var NDWI = index(B03, B08);
  return NDWI > 0.2;
}

// Water turbidity index
var wt = index(B04, B03);
// Normalized difference moisture index
var ndmi = index(B08, B11);
// Water mask (using NDWI)
var mask = water_mask();

// Color map for water tubidity
let underflow_color_wt = [0, 0, 1];
let low_color_wt = [0, 1, 0];
let high_color_wt = [1, 0 , 0];
let overflow_color_wt = [1, 1, 1];
let min_wt = -0.7;
let mp_wt = -0.2;
let max_wt = 0;

// Color map for ndmi
let ramp = [[-0.5, 0x000000],[0.5, 0xffffff]];
var visualizer = new ColorRampVisualizer(ramp);

// Display
if (mask) return colorBlend(wt, [min_wt, mp_wt, max_wt],[underflow_color_wt, low_color_wt, high_color_wt, overflow_color_wt]);
else return visualizer.process(ndmi);
//else return [B04*2.9, B03*3.1, B02*3.0];
