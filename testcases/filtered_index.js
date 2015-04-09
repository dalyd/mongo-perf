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

tests.push( { name : "Filtered_Index.v1.filter-used",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-unused",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-mixuse",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


tests.push( { name : "Filtered_Index.v1.filter-used.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 0, 500 ]}}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-unused.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 500, 4800 ]}}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.v1.filter-mixuse.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFiltered(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : { "#RAND_INT" : [ 0 , 4800 ] } } } }
              ] } );

tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-used",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-unused",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-mixuse",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-used.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 0, 500 ]}}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-unused.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 500, 4800 ]}}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.Non_Selective.v1.filter-mixuse.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestFilteredNonSelective(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : { "#RAND_INT" : [ 0 , 4800 ] } } } }
              ] } );

tests.push( { name : "Filtered_Index.indexed.v1.filter-used",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.indexed.v1.filter-unused",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.indexed.v1.filter-mixuse",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


tests.push( { name : "Filtered_Index.indexed.v1.filter-used.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 0, 500 ]}}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.indexed.v1.filter-unused.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 500, 4800 ]}}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.indexed.v1.filter-mixuse.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTestIndexed(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : { "#RAND_INT" : [ 0 , 4800 ] } } } }
              ] } );


tests.push( { name : "Filtered_Index.not-indexed.v1.filter-used",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 0, 500 ]}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.not-indexed.v1.filter-unused",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 500, 4800 ]}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.not-indexed.v1.filter-mixuse",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


tests.push( { name : "Filtered_Index.not-indexed.v1.filter-used.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 0, 500 ]}}, a : {$lt : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.not-indexed.v1.filter-unused.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : {"#RAND_INT" : [ 500, 4800 ]}}, a : {$gte : 500  } } }
              ] } );

tests.push( { name : "Filtered_Index.not-indexed.v1.filter-mixuse.lte",
              tags: ['monthly'],
              pre: function( collection ) {
                  setupTest(collection);
              },

              ops : [
                  { op: "find", query:  { x : {$lte : { "#RAND_INT" : [ 0 , 4800 ] } } } }
              ] } );
