var async = require("async");
var fs = require("fs");
var Promise = require("bluebird");
var assert = require("assert");
/*const check = function(arg, callback){
  if(typeof arg != 'number'){
    return callback("not a number");
  }

  callback(null, "Yes it is a number");
}

check("fxg", function(err, data){
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
});*/

/*async.concatSeries([__dirname+'/swagger',__dirname+'/app'], fs.readdir, function(err, files) {
    if(err) console.log(err);
    console.log(files);
});*/

/*async.detect(['index.html','test.js','server.js'], function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, result) {
    // result now equals the first file in the list that exists
    console.log(result);
});*/

/*async.sortBy(['package.json','test.js','server.js'], function(filePath, callback) {
    fs.access(filePath, function(err) {
        callback(null, !err)
    });
}, function(err, result) {
    // if result is true then every file exists
    console.log(result);
});*/

/*async.sortBy([1,9,3,5], function(x, callback) {
    callback(null, x);
}, function(err,result) {
    // result callback
    console.log(result);
});*/
/*async.map(['test.js','server.js'], fs.stat, function(err, results) {
    // results is now an array of stats for each file
    console.log(results);
});*/

/*async.mapValues({
    f1: 'test.js',
    f2: 'server.js'
}, function (file, key, callback) {
  fs.stat(file, callback);
}, function(err, result) {
    // result is now a map of stats for each file, e.g.
    // {
    //     f1: [stats for file1],
    //     f2: [stats for file2],
    //     f3: [stats for file3]
    // }
    console.log(result);
});*/

/*async.transform([1,3,2], function(acc, item, index, callback) {
    // pointless async:
    process.nextTick(function() {
        acc.push(item * 2)
        callback(null)
    });
}, function(err, result) {
    // result is now equal to [2, 4, 6]
    console.log(result);
});*/

// create a cargo object with payload 2
/*var cargo = async.cargo(function(tasks, callback) {
    for (var i=0; i<tasks.length; i++) {
        console.log('hello ' + tasks[i].name);
    }
    callback();
}, 3);

// add some items
cargo.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
cargo.push({name: 'bar'}, function(err) {
    console.log('finished processing bar');
});
cargo.push({name: 'baz'}, function(err) {
    console.log('finished processing baz');
});*/

/*function add1(n, callback) {
    setTimeout(function () {
        callback(null, n + 1);
    }, 10);
}

function mul3(n, callback) {
    setTimeout(function () {
        callback(null, n * 3);
    }, 10);
}

var add1mul3 = async.compose(mul3, add1);
add1mul3(4, function (err, result) {
    // result now equals 15
    console.log(result);
});*/

/*var count = 0;
async.whilst(
    function() { return count < 2; },
    function(callback) {
        count++;
        setTimeout(function() {
            callback(null, count);
        }, 1000);
    },
    function (err, n) {
        // 5 seconds have passed, n = 5
        console.log(n);
    }
);*/

/*var count = 0;

async.during(
    function (callback) {
        return callback(null, count < 5);
    },
    function (callback) {
        count++;
        setTimeout(callback, 1000);
    },
    function (err) {
        // 5 seconds have passed

    }
);*/


// an example using an object instead of an array
/*async.parallel({
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    },
    two: function(callback) {
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    }
}, function(err, results) {
    // results is now equals to: {one: 1, two: 2}
    console.log(results);
});*/

// create a queue object with concurrency 2
/*var q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

// assign a callback
q.drain = function() {
    console.log('all items have been processed');
};

// add some items to the queue
q.push({name: 'foo'}, function(err) {
    console.log('finished processing foo');
});
q.push({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});

// add some items to the queue (batch-wise)
q.push([{name: 'baz'},{name: 'bay'},{name: 'bax'}], function(err) {
    console.log('finished processing item');
});

// add some items to the front of the queue
q.unshift({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});*/

/*async.series({

    two: function(callback){
        setTimeout(function() {
            callback(null, 2);
        }, 100);
    },
    one: function(callback) {
        setTimeout(function() {
            callback(null, 1);
        }, 200);
    }
}, function(err, results) {
    // results is now equal to: {one: 1, two: 2}
    console.log(results);
});*/

// Pretend this is some complicated async factory
/*var createUser = function(id, callback) {
    callback(null, {
        id: 'user' + id
    });
};

// generate 5 users
async.times(5, function(n, next) {
    createUser(n, function(err, user) {
        next(err, user);
    });
}, function(err, users) {
    // we should now have 5 users
    console.log(users);
});*/

/*function* count(){
  for (var x = 0; x < 100; x++) {
    yield x
  }
}

for (var x of count()) {
  console.log(x);
}*/

async.auto({
    get_data: function(callback) {
        console.log('in get_data');
        // async code to get some data
        callback(null, 'data', 'converted to array');
    },
    make_folder: function(callback) {
        console.log('in make_folder');
        // async code to create a directory to store a file in
        // this is run at the same time as getting the data
        callback(null, 'folder');
    },
    write_file: ['get_data', 'make_folder', function(results, callback) {
        console.log('in write_file', JSON.stringify(results));
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        callback(null, 'filename');
    }],
    email_link: ['write_file', function(results, callback) {
        console.log('in email_link', JSON.stringify(results));
        // once the file is written let's email a link to it...
        // results.write_file contains the filename returned by write_file.
        callback(null, {'file':results.write_file, 'email':'user@example.in'});
    }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});
