//VERSION=3

/*
Non-working script.
To use as a model for all custom scripts.
*/

function setup() {
  return {
    input: [{}], // Specify the inputs used
    output: {}, // Sepcify the format of the output javascript object, returned by the function 'setup'
    mosaicking: "SIMPLE" // Default value, use 'TILE' or 'ORBIT' when performing data fusion or multi-temporal analysis
  };
}

function someFunction(arg) {
  // To be used inside other functions
  const ramps = [
    [200, 0xff0000],
    [300, 0x0000ff]
  ];
  const visualizer = new ColorRampVisualizer(ramps)
}

function preProcessScenes(collections) {
  /*
  Use to filter scenes, and enhance processing time. To be used only with 'TILE' or 'ORBIT' mosaicking.
  Must return a 'collections' object.
  */
  var allowedDates = ["2017-05-15", "2017-06-24"];
  
  // Using 'TILE' mosaicking
  collections.scenes.tiles = collections.scenes.tiles.filter(function (tile) {
    var tileDate = tile.date.split("T")[0];
    return allowedDates.includes(tileDate);
  });

  // Using 'ORBIT' mosaicking
  collections.scenes.orbits = collections.scenes.orbits.filter(function (orbit) {
    var orbitDateFrom = orbit.dateFrom.split("T")[0];
    return allowedDates.includes(orbitDateFrom);
  });

  return collections
}

function evaluatePixel(samples, scenes, inputMetadata, customData, outputMetadata) {
  // This function is the output of the script.
  // Make sure the returned object match the described output object of the setup function.
  return [];
}
