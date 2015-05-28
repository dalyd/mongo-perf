if ( typeof(tests) != "object" ) {
    tests = [];
}

// generate a grid map from (x1, y1) to (x2, y2), with 100 point each side
function generateGridMap(collection, x1, y1, x2, y2, indexType) {
    var step_x = (x2 - x1) / 100.0;
    var step_y = (y2 - y1) / 100.0;

    collection.drop(); 
    collection.ensureIndex({loc: indexType});

    for( var i = x1; i < x2; ) {
        for(var j = y1; j < y2; ) {
            collection.insert({loc: [i, j]});
            j = j + step_y;
        }
        i = i + step_x;
    }
    collection.getDB().getLastError();
}

// generate a grid map with geoJSON format
function generateGridMapGeoJSON(collection, x1, y1, x2, y2, indexType) {
    var step_x = (x2 - x1) / 100.0;
    var step_y = (y2 - y1) / 100.0;

    collection.drop(); 
    collection.ensureIndex({loc: indexType});

    for( var i = x1; i < x2; ) {
        for(var j = y1; j < y2; ) {
            collection.insert({loc: {type: "Point", coordinates: [i, j]}});
            j = j + step_y;
        }
        i = i + step_x;
    }
    collection.getDB().getLastError();
}

var ops = [];

// define the area for collection
var x_min = -0.005;
var x_max =  0.005;
var y_min = -0.005;
var y_max =  0.005;

// define the area to run query from
var x_query_min = -0.0045;
var x_query_max =  0.0045;
var y_query_min = -0.0045;
var y_query_max =  0.0045;

var x_query_step = (x_query_max - x_query_min) / 5.0;
var y_query_step = (y_query_max - y_query_min) / 5.0;

// General Note:
//    - the map is [-0.005, -0.005, 0.005, 0.005] with 100 point each side
//    - test is run from 25 (5x5) points evenly distributed over the map
//    - query point shall not match any point in collection

// Test: Geo.geoJSON.nearSphere.2dsphere.find
//     - to test nearSphere query with geoJSON format, 
//     - with 2dsphere index
//     - the $maxDistance make sure return ~60 per query
ops = [];
for( var i = 0; i < 5; i++) {
    for( var j = 0; j < 5; j++) {
        ops.push({
            op: "find", 
            query: {loc: {$nearSphere: {
                $geometry: {
                    type: "Point", 
                    coordinates: [x_query_min + x_query_step * i + 0.00003, 
                                  y_query_min + y_query_step * j + 0.00003]}, 
                $maxDistance: 50}}}});
    }
}
tests.push( { name: "Geo.geoJSON.nearSphere.2dsphere.find",
              tags: ['geo', 'sanity', 'daily','weekly','monthly'],
              pre: function( collection ) { 
                  generateGridMapGeoJSON(collection, 
                          -0.005, -0.005, 0.005, 0.005, "2dsphere");
              },
              ops: ops } );

// Test: Geo.geoJSON.nearSphere.2dsphere.findOne
//     - to test nearSphere query with geoJSON format, 
//     - with 2dsphere index
//     - find one doc only
ops = [];
for( var i = 0; i < 5; i++) {
    for( var j = 0; j < 5; j++) {
        ops.push({
            op: "findOne", 
            query: {loc: {$nearSphere: {
                $geometry: {
                    type: "Point", 
                    coordinates: [x_query_min + x_query_step * i + 0.00003, 
                                  y_query_min + y_query_step * j + 0.00003]}, 
                }}});
    }
}
tests.push( { name: "Geo.geoJSON.nearSphere.2dsphere.findOne",
              tags: ['geo', 'sanity', 'daily','weekly','monthly'],
              pre: function( collection ) { 
                  generateGridMapGeoJSON(collection, 
                        -0.005, -0.005, 0.005, 0.005, "2dsphere");
              },
              ops: ops } );

// Test: Geo.geoJSON.within.2dsphere.centersphere 
//     - to test $within by centersphere query with geoJSON format, 
//     - with 2dsphere index
//     - find ~60 doc
ops = [];
for( var i = 0; i < 5; i++) {
    for( var j = 0; j < 5; j++) {
        ops.push({
            op: "find", 
            limit: 10,
            query: {loc: {$geoWithin: {
                $centerSphere: [[x_query_min + x_query_step * i + 0.00003, 
                                 y_query_min + y_query_step * j + 0.00003], 
                                0.0000078], 
                }}}});
    }
}
tests.push( { name: "Geo.geoJSON.within.2dsphere.centersphere",
              tags: ['geo', 'sanity', 'daily','weekly','monthly'],
              pre: function( collection ) { 
                  generateGridMapGeoJSON(collection, 
                          -0.005, -0.005, 0.005, 0.005, "2dsphere");
              },
              ops: ops } );

// Test: Geo.near.2d.find100
//     - to test $near query with legacy format, 
//     - with 2d index
//     - limit to 100 doc
ops = [];
for( var i = 0; i < 5; i++) {
    for( var j = 0; j < 5; j++) {
        ops.push({
            op: "find", 
            limit: 100,
            query: {loc: { $near: [x_query_min + x_query_step * i + 0.00003, 
                                   y_query_min + y_query_step * j + 0.00003]}
            }});
    }
}
tests.push( { name: "Geo.near.2d.find100",
              tags: ['geo', 'sanity', 'daily','weekly','monthly'],
              pre: function( collection ) { 
                  generateGridMap(collection, 
                          -0.005, -0.005, 0.005, 0.005, "2d");
              },
              ops: ops } );

// Test: Geo.near.2d.findOne
//     - to test $near query with legacy format, 
//     - with 2d index
ops = [];
for( var i = 0; i < 5; i++) {
    for( var j = 0; j < 5; j++) {
        ops.push({
            op: "findOne", 
            query: {loc: { $near: [x_query_min + x_query_step * i + 0.00003, 
                                   y_query_min + y_query_step * j + 0.00003]}
            }});
    }
}
tests.push( { name: "Geo.near.2d.findOne",
              tags: ['geo', 'sanity', 'daily','weekly','monthly'],
              pre: function( collection ) { 
                  generateGridMap(collection, 
                          -0.005, -0.005, 0.005, 0.005, "2d");
              },
              ops: ops } );

// Test: Geo.within.2d.find
//     - to test $geoWithin with $center query with legacy format, 
//     - with 2d index
//     - limit to 100 doc via distance
ops = [];
for( var i = 0; i < 5; i++) {
    for( var j = 0; j < 5; j++) {
        ops.push({
            op: "find", 
            query: {loc: { $geoWithin: {
                $center: [[x_query_min + x_query_step * i + 0.00003, 
                           y_query_min + y_query_step * j + 0.00003], 
                         0.00057]}}
            }});
    }
}
tests.push( { name: "Geo.within.2d.find",
              tags: ['geo', 'sanity', 'daily','weekly','monthly'],
              pre: function( collection ) { 
                  generateGridMap(collection, 
                          -0.005, -0.005, 0.005, 0.005, "2d");
              },
              ops: ops } );

