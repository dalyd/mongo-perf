if ( typeof(tests) != "object" ) {
    tests = [];
}

var setupTest = function (collection) {
    collection.drop();
}

var setupTestFiltered = function (collection) {
    setupTest(collection);
    collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 500 } } } );
    collection.getDB().getLastError();
}

var setupTestFilteredNonSelective = function (collection) {
    setupTest(collection);
    collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 4800 } } } );
    collection.getDB().getLastError();
}

var setupTestIndexed = function (collection) {
    setupTest(collection);
    collection.ensureIndex( { x : 1 });
    collection.getDB().getLastError();
}

tests.push( { name : "Filtered_Index_Insert.v1.filter-used",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {"#RAND_INT" : [ 0, 500 ]} } }
              ] } );

tests.push( { name : "Filtered_Index_Insert.v1.filter-unused",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {"#RAND_INT" : [ 500, 4800 ]} } }
              ] } );

tests.push( { name : "Filtered_Index_Insert.v1.filter-mixuse",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );

// Compare to filtered index. Should be the same
tests.push( { name : "Filtered_Index_Insert.Non_Selective.v1.filter-used",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {"#RAND_INT" : [ 0, 500 ]} } }
              ] } );

// Compare to general and non-selective index. Expect this to be faster since it's not updating the index
tests.push( { name : "Filtered_Index_Insert.Non_Selective.v1.filter-unused",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {"#RAND_INT" : [ 500, 4800 ]} } }
              ] } );

tests.push( { name : "Filtered_Index_Insert.Non_Selective.v1.filter-mixuse",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


tests.push( { name : "Filtered_Index_Insert.indexed.v1.filter-used",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {"#RAND_INT" : [ 0, 500 ]} } }
              ] } );

tests.push( { name : "Filtered_Index_Insert.indexed.v1.filter-unused",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {"#RAND_INT" : [ 500, 4800 ]} } }
              ] } );

tests.push( { name : "Filtered_Index_Insert.indexed.v1.filter-mixuse",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


tests.push( { name : "Filtered_Index_Insert.not-indexed.v1.filter-used",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {"#RAND_INT" : [ 0, 500 ]} } }
              ] } );

tests.push( { name : "Filtered_Index_Insert.not-indexed.v1.filter-unused",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {"#RAND_INT" : [ 500, 4800 ]} } }
              ] } );

tests.push( { name : "Filtered_Index_Insert.not-indexed.v1.filter-mixuse",
              tags: ['insert','monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


