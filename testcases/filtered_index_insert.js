if ( typeof(tests) != "object" ) {
    tests = [];
}

var setupTest = function (collection) {
    collection.drop();
}

var setupTestFiltered = function (collection) {
    setupTest(collection);
    collection.createIndex( { x : 1 }, { filter : { a : { $lt : 500 } } } );
}

var setupTestFilteredNonSelective = function (collection) {
    setupTest(collection);
    collection.createIndex( { x : 1 }, { filter : { a : { $lt : 4800 } } } );
}

var setupTestIndexed = function (collection) {
    setupTest(collection);
    collection.createIndex( { x : 1 });
}

tests.push( { name : "Inserts.PartialIndex.v1.FilteredRange",
              tags: ['partial_index','insert','daily'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {"#RAND_INT" : [ 0, 500 ]} } }
              ] } );

tests.push( { name : "Inserts.PartialIndex.v1.NonFilteredRange",
              tags: ['partial_index','insert','daily'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {"#RAND_INT" : [ 500, 4800 ]} } }
              ] } );

tests.push( { name : "Inserts.PartialIndex.v1.FullRange",
              tags: ['partial_index','insert','daily'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );

// Compare to filtered index. Should be the same
tests.push( { name : "Inserts.PartialIndex.AllInIndex.v1.FilteredRange",
              tags: ['partial_index','insert'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {"#RAND_INT" : [ 0, 500 ]} } }
              ] } );

// compare to general index
tests.push( { name : "Inserts.PartialIndex.AllInIndex.v1.FullRange",
              tags: ['partial_index','insert'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );

// compare to filtered index, filtered used
tests.push( { name : "Inserts.PartialIndex.indexed.v1.FilteredRange",
              tags: ['partial_index','insert'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {"#RAND_INT" : [ 0, 500 ]} } }
              ] } );

// compare to filtered index -- non-selective
tests.push( { name : "Inserts.PartialIndex.indexed.v1.FullRange",
              tags: ['partial_index','insert'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "insert", doc:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );



