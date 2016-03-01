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
  features.push(feature);
});

// sort all features
features = _.sortBy(features, function(feature) {
  return feature.properties.name;
});

var result = {
  "type": "FeatureCollection",
  "features": features
};

// write the result out to disk
fs.writeFileSync(_basePath + '/generated/location-index.geojson', JSON.stringify(result, null, 2));

console.log('Done!')
