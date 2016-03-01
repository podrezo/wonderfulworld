var fs = require('fs')
  , _ = require('underscore')
  , _basePath = __dirname + '/..';

// Load all locations in /db folder
var locations = fs.readdirSync(_basePath + '/db');
var features = [];
var i=1;
_.forEach(locations, function(fileName) {
  console.log('Processing ' + fileName + ' (' + (i) + ' of ' + locations.length + ')');
  i++;
  // load file
  var fileContents = fs.readFileSync(_basePath + '/db/' + fileName);
  var feature = JSON.parse(fileContents);
  // (re)write ID as the filename without extension
  feature.id = fileName.substr(0, fileName.indexOf('.geojson'));
  features.push(feature);
});

// sort all features
console.log('Sorting all features...');

features = _.sortBy(features, function(feature) {
  return feature.properties.name;
});

// Generate list of similar features for each feature
console.log('Generating similarity indexes...');

_.each(features, function(feature) {
  // generate similarity index
  var similarities = _.map(features, function(cmp) {
    var similarityIndex = 0;
    if (cmp.id === feature.id) {
      // do not count similarities between a place and itself
      similarityIndex = -1;
    } else {
      for (var i in cmp.properties.tags) {
        for (var j in feature.properties.tags) {
          if (cmp.properties.tags[i] === feature.properties.tags[j]) {
            similarityIndex++;
          }
        }
      }
    }
    return {
      value: cmp,
      similarityIndex: similarityIndex
    };
  });
  similarities = _.sortBy(similarities, 'similarityIndex');
  feature.properties.similarPlaces = [];
  for (var i = 0; i < 4; i++) {
    var currentPlace = similarities[similarities.length - 1 - i];
    // at least two tags should be the same for it to be considered similar
    if (currentPlace.similarityIndex < 2) {
      break;
    }
    feature.properties.similarPlaces.push(currentPlace.value.id);
  }
});

console.log('Generating results file...')

var result = {
  "type": "FeatureCollection",
  "features": features
};

// write the result out to disk
fs.writeFileSync(_basePath + '/generated/location-index.geojson', JSON.stringify(result, null, 2));

console.log('Done!')
