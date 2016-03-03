var fs = require('fs')
  , _ = require('underscore')
  , countryCodes = require('./country-codes.js')
  , _basePath = __dirname + '/..';

// Load all locations in /db folder
var locations = fs.readdirSync(_basePath + '/db');
var features = [];
var filterableFields = {
  countries: [],
  tags: []
};
var i=1;
_.forEach(locations, function(fileName) {
  console.log('Processing ' + fileName + ' (' + (i) + ' of ' + locations.length + ')');
  i++;
  // load file
  var fileContents = fs.readFileSync(_basePath + '/db/' + fileName);
  var feature = JSON.parse(fileContents);
  // (re)write ID as the filename without extension
  feature.id = fileName.substr(0, fileName.indexOf('.geojson'));
  // set country name to augment the country code
  var country = _.findWhere(countryCodes, {"alpha-2":feature.properties.countryCode});
  feature.properties.country = country.name;
  features.push(feature);

  // set filterable fields index: Country
  var existingCountry = _.findWhere(filterableFields.countries,{countryCode: feature.properties.countryCode});
  if(existingCountry) {
    existingCountry.quantity++;
  } else {
    filterableFields.countries.push({
      countryCode: feature.properties.countryCode,
      country: feature.properties.country,
      quantity: 1
    });
  }

  // set filterable fields index: Tags
  _.each(feature.properties.tags, function(tag) {
    var existingTag = _.findWhere(filterableFields.tags,{tag: tag});
    if(existingTag) {
      existingTag.quantity++;
    } else {
      filterableFields.tags.push({
        tag: tag,
        quantity: 1
      });
    }
  });
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

console.log('Generating results file...');

var result = {
  "type": "FeatureCollection",
  "features": features
};

// write the result out to disk
fs.writeFileSync(_basePath + '/generated/location-index.geojson', JSON.stringify(result, null, 2));

console.log('Sorting data in filters file...');
// sort countries
filterableFields.countries = _.sortBy(filterableFields.countries, function(entry) { return entry.country; });
// sort tags
filterableFields.tags = _.sortBy(filterableFields.tags, function(entry) { return -1 * entry.quantity; });

console.log('Generating filters file...');
fs.writeFileSync(_basePath + '/generated/filters-data.json', JSON.stringify(filterableFields, null, 2));


console.log('Done!')
