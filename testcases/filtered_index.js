if ( typeof(tests) != "object" ) {
    tests = [];
}

tests.push( { name : "Filted_Index.v1.filter-used",
              tags: ['monthly'],
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 4000 } } } );
                  for ( var i = 0; i < 4800; i++ ) {
                      collection.insert( { x : i, a : i } );
                  }
                  collection.getDB().getLastError();
              },

              ops : [
                  { op: "find", query:  { x : {"#RAND_INT" : [ 4000 , 4800 ] } } }
              ] } );

tests.push( { name : "Filted_Index.v1.filter-unused",
              tags: ['monthly'],
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 4000 } } } );
                  for ( var i = 0; i < 4800; i++ ) {
                      collection.insert( { x : i, a : i } );
                  }
                  collection.getDB().getLastError();
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0, 4000] } } } 
              ] } );

tests.push( { name : "Filted_Index.v1.filter-mixuse",
              tags: ['monthly'],
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 4000 } } } );
                  for ( var i = 0; i < 4800; i++ ) {
                      collection.insert( { x : i, a : i } );
                  }
                  collection.getDB().getLastError();
              },

              ops : [
                  { op: "find", query:  { x : { "#RAND_INT" : [ 0 , 4800 ] } } }
              ] } );


tests.push( { name : "Filted_Index.v1.filter-used.gte",
              tags: ['monthly'],
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 4000 } } } );
                  for ( var i = 0; i < 4800; i++ ) {
                      collection.insert( { x : i, a : i } );
                  }
                  collection.getDB().getLastError();
              },

              ops : [
                  { op: "find", query:  { x : {$gte : { "#RAND_INT" : [ 4000 , 4800 ] } } } }
              ] } );

tests.push( { name : "Filted_Index.v1.filter-unused.gte",
              tags: ['monthly'],
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 4000 } } } );
                  for ( var i = 0; i < 4800; i++ ) {
                      collection.insert( { x : i, a : i } );
                  }
                  collection.getDB().getLastError();
              },

              ops : [
                  { op: "find", query:  { x : {$gte : { "#RAND_INT" : [ 0, 4000] } } } }
              ] } );

tests.push( { name : "Filted_Index.v1.filter-mixuse.gte",
              tags: ['monthly'],
              pre: function( collection ) {
                  collection.drop();
                  collection.ensureIndex( { x : 1 }, { filter : { a : { $lt : 4000 } } } );
                  for ( var i = 0; i < 4800; i++ ) {
                      collection.insert( { x : i, a : i } );
                  }
                  collection.getDB().getLastError();
              },

              ops : [
                  { op: "find", query:  { x : {$gte : { "#RAND_INT" : [ 0 , 4800 ] } } } }
              ] } );
