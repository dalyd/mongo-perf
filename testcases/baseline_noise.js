if ( typeof(tests) != "object" ) {
    tests = [];
}

// This contacts the server and generates an error. Should make a log messagexo
tests.push( { name: "Commands.illegalOp",
              tags: ['skip'],
              ops: [
                  { op: "command", ns : "#B_DB", command : { "notExist" : 1 } }
              ] } );

// This does not contact the server. Noop in benchrun loop
tests.push( { name: "Commands.nop",
              tags: ['skip','baseline'],
              ops: [
                  { op: "nop" }
              ] } );

// This does not contact the server. Sleeps for 1 ms 
tests.push( { name: "Commands.sleep.1ms.local",
              tags: ['skip','baseline'],
              ops: [
                  { op: "sleepMicros", micros : NumberLong(1000) }
              ] } );

// This does not contact the server. Sleeps for 10 ms 
tests.push( { name: "Commands.sleep.10ms.local",
              tags: ['skip','baseline'],
              ops: [
                  { op: "sleepMicros", micros : NumberLong(10000) }
              ] } );

// Sleeps for 1 ms on server
tests.push( { name: "Commands.sleep.1ms.server",
              tags: ['skip','baseline'],
              ops: [
                  {op : "command", command : {"sleepmicros" : 1, micros : NumberLong(1000)}, ns : "test.test"}
              ] } );

// Sleeps for 10 ms on server
tests.push( { name: "Commands.sleep.10ms.local",
              tags: ['skip','baseline'],
              ops: [
                  {op : "command", command : {"sleepmicros" : 1, micros : NumberLong(10000)}, ns : "test.test"}
              ] } );

// This does not contact server. Copies a value in benchrun loop
tests.push( { name: "Commands.let",
              tags: ['skip','baseline'],
              ops: [
                  { op: "let", target: "x", value : 1 }
              ] } );

// This does not contact server. Copies a random value in benchrun loop
tests.push( { name: "Commands.let.randint",
              tags: ['skip','baseline'],
              ops: [
                  { op: "let", target: "x", value : {"#RAND_INT_PLUS_THREAD": [0,100]} }
              ] } );

// This does not contact server. Copies a random value in benchrun loop
tests.push( { name: "Commands.let.randstring",
              tags: ['skip','baseline'],
              ops: [
                  { op: "let", target: "x", value : {"#RAND_STRING": [10]} }
              ] } );

// This contacts the server and does a noop on the server
tests.push( { name: "Commands.noop",
              tags: ['skip', 'baseline'],
              ops: [
                  { op: "command", 
                    ns : "#B_DB",
                    command : { noop : 1}}
              ] } );
// This contacts the server and does a noop on the server
tests.push( { name: "Commands.ping",
              tags: ['skip', 'baseline'],
              ops: [
                  { op: "command", 
                    ns : "#B_DB",
                    command : { ping : 1}}
              ] } );
// This contacts the server and does a noop on the server
tests.push( { name: "Commands.uri",
              tags: ['skip', 'baseline'],
              ops: [
                  { op: "command", 
                    ns : "#B_DB",
                    command : { whatsmyuri : 1}}
              ] } );
// This contacts the server and does a noop on the server
tests.push( { name: "Commands.buildinfo",
              tags: ['skip', 'baseline'],
              ops: [
                  { op: "command", 
                    ns : "#B_DB",
                    command : { buildinfo : 1}}
              ] } );
// This contacts the server and does a noop on the server
tests.push( { name: "Commands.isMaster",
              tags: ['skip', 'baseline'],
              ops: [
                  { op: "command", 
                    ns : "#B_DB",
                    command : { ismaster : 1}}
              ] } );
// This contacts the server and does a noop on the server
tests.push( { name: "Commands.sleep",
              tags: ['skip', 'baseline'],
              ops: [
                  { op: "command", 
                    ns : "admin",
                    command : { sleep : 1, w:false, secs:0.01}}
              ] } );

