//VERSION=3

const preDate = "YYYY-MM-DD";
const postDate = "YYYY-MM-DD";

function setup() {
    return {
        input: [{bands: ["B02", "B03", "B04", "B08", "B12"]}],
        output: {bands: 3},
        mosaicking: "ORBIT"
    };
}

function preProcessScenes(collections) {
    var allowedDates = [preDate, postDate];
    collections.scenes.orbits = collections.scenes.orbits.filter(function (orbit) {
    	var orbitDateFrom = orbit.dateFrom.split("T")[0];
    	return allowedDates.includes(orbitDateFrom);
    });
    return collections
}

function evaluatePixel(samples, scenes) {
	var preSample = samples[1];
	var postSample = samples[0];
	
	// Compute difference between NBR before and after wildfire
	var dNBR = index(preSample.B08, preSample.B12) - index(postSample.B08, postSample.B12);

	var ndwi = index(preSample.B03, preSample.B08);

	if (ndwi > 0.2 || dNBR <= 0.100) {
		// Unburned or water
		return [postSample.B04 * 2.5, postSample.B03 * 2.5, postSample.B02 * 2.5]
	} else if (dNBR > 0.660) {
		// Very high burn severity degree
		return [0, 0, 0];
	} else if (dNBR > 0.420) {
		// High burn severity degree
		return [1, 0, 0];
	} else if (dNBR > 0.256) {
		// Moderate burn severity degree
		return [1, 0.5, 0];
	} else if (dNBR > 0.100) {
		// Low burn severity degree
		return [1, 1, 0];
	}
}