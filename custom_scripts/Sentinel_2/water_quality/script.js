//VERSION=3

function setup() {
	return {
		input: [{
			bands: ["B02", "B03", "B04", "B08"]
		}],
		output: {
			bands: 3
		}
	};
}

function evaluatePixel(sample) {
	var ndwi = index(sample.B03, sample.B08);
	var wt = index(sample.B04, sample.B03);

	var visualizer = ColorGradientVisualizer.createWhiteGreen(-0.5, 0.5);

	// Tuning gains
	var a = 2.5;
	var b = 2.5;
	var c = 2.5;

	if (ndwi > 0.15) {
		return visualizer.process(wt);
	} else {
		return [a * sample.B04, b * sample.B03, c * sample.B02];
	}
}
