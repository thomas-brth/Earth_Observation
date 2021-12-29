//VERSION=3

function setup() {
	return {
		input: {
			bands: ["B02", "B03", "B04", "B08"]
		},
		output: {
			bands: 3
		}
	};
}

function evaluatePixel(sample) {
	var ndwi = index(sample.B03, sample.B08);
	var wt = index(sample.B04, sample.B03);

	let ramp = [
		[-0.5, 0x000000],
		[0.5, 0xffffff]
	];
	var visualizer = new ColorRampVisualizer(ramp);

	if (ndwi > 0.2) {
		return visualizer.process(wt);
	} else {
		return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02];
	};
}
