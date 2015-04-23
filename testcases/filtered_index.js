if ( typeof(tests) != "object" ) {
    tests = [];
}

var setupTest = function (collection) {
    collection.drop();
    for ( var i = 0; i < 4800; i++ ) {
        collection.insert( { x : i, a : i } );
    }
    collection.getDB().getLastError();
 
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

tests.push( { name : "Filtered_Index.v1.filter-used",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-unused",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-mixuse",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 4800 ]}, a : {$lt : 4800  } } }
              ] } );


tests.push( { name : "Filtered_Index.v1.filter-used.lte",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : {"#RAND_INT" : [ 0, 500 ]}}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-unused.lte",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : {"#RAND_INT" : [ 500, 4800 ]}}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-mixuse.lte",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : { "#RAND_INT" : [ 0 , 4800 ]}}, a : {$lt : 4800  } }  }
              ] } );

// Compare to the selective. How much does the selective help?
tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-used",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {$lt : 500  } } }
              ] } );

// Compare to the regular index case
tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-mixuse",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : {$lt : 4800  } } }
              ] } );

// compare to the filtered selective case. Any difference?
tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-used.lte",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : {"#RAND_INT" : [ 0, 500 ]}}, a : {$lt : 500  } } }
              ] } );

// compare to regular index
tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-mixuse.lte",
              tags: ['partial_index','query','monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : { "#RAND_INT" : [ 0 , 4800 ] }}, a : {$lt : 4800  } } } 
              ] } );

// Compare to the filtered case
tests.push( { name : "Filtered_Index.indexed.v1.filter-used",
              tags: ['partial_index','query','baseline'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {$lt : 500  } } }
              ] } );

// Compare to the non-selective filtered index
tests.push( { name : "Filtered_Index.indexed.v1.filter-mixuse",
              tags: ['partial_index','query','baseline'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0 , 4800 ] }, a : {$lt : 4800  } } }
              ] } );

tests.push( { name : "Filtered_Index.indexed.v1.filter-used.lte",
              tags: ['partial_index','query','baseline'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : {"#RAND_INT" : [ 0, 500 ]}}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.indexed.v1.filter-mixuse.lte",
              tags: ['partial_index','query','baseline'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : { "#RAND_INT" : [ 0 , 4800 ] }}, a : {$lt : 4800  } } } 
              ] } );

// Compare to the filtered index filter-unused case. Both are collection scans
tests.push( { name : "Filtered_Index.not-indexed.v1.filter-unused",
              tags: ['partial_index','query','baseline'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {$gte : 500  } } }
              ] } );

// Compare to the filtered index filter-unused case. Both are collection scans
tests.push( { name : "Filtered_Index.not-indexed.v1.filter-unused.lte",
              tags: ['partial_index','query','baseline'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "findOne", query:  { x : {$lte : {"#RAND_INT" : [ 500, 4800 ]}}, a : {$gte : 500  } } }
              ] } );

