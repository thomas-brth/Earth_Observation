//VERSION=3

function setup() {
  return {
    input: ["B02","B03","B04","B08", "dataMask"],
    output: { bands: 4 }
  };
}

function get_rgb(sample) {
  return [2.9 * sample.B04, 3.1 * sample.B03, 3.0 * sample.B02, sample.dataMask];
}

function get_fir(sample) {
  return [2.5 * sample.B08, 2.5 * sample.B04, 2.5 * sample.B03, sample.dataMask];
}

function evaluatePixel(sample) {
  var NDVI = index(sample.B08, sample.B04);
  if (NDVI > 0.5) {
    return get_fir(sample);
  } else {
    return get_rgb(sample);
  }
}
