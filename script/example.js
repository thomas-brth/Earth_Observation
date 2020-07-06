//VERSION=3

/*
Basic script.
Functions 'setup' and 'evaluatePixel' are key functions in sentinel-hub custom scripts.
  - 'setup' enables to grab all needed bands.
' - 'evaluatePixel' can be seen as the main function, where all the processing is done.
*/
function setup() {
  return {
    input: ["B02","B03","B04","B08", "dataMask"],
    output: { bands: 4 }
  };
}

function get_rgb(sample, mask) {
  return [2.9 * sample.B04, 3.1 * sample.B03, 3.0 * sample.B02, mask];
}

function get_fir(sample, mask) {
  return [2.5 * sample.B08, 2.5 * sample.B04, 2.5 * sample.B03, mask];
}

function evaluatePixel(sample) {
  var NDVI = index(sample.B08, sample.B04);
  var ndvi_mask = NDVI >= 0.7;
  if (ndvi_mask) {
  	return get_fir(sample, (ndvi_mask) * sample.dataMask);
  } else {
    return get_rgb(sample, (!ndvi_mask) * sample.dataMask);
  }
}
