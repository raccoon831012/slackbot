var fs = require("fs");
var sampleObject = {
    a: 1,
    b: 2,
    c: {
        x: 11,
        y: 22
    }
};

fs.writeFile("./object.json", JSON.stringify(sampleObject, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

var sampleObject55 = {
    a: 1,
    b: 2,
    c: {
        x: 11,
        y: 22
    }
};

fs.appendFile('./object.json','Some more text to append.',function(err){
    if(err)
      console.error(err);
    console.log('Appended!');
  });

// let path = './object.json';
// let buffer = new Buffer('Those who wish to follow me\nI welcome with my hands\nAnd the red sun sinks at last');


// fs.open(path, 'w', function(err, fd) {  
//     console.log('fd', fd)
//     if (err) {
//         throw 'could not open file: ' + err;
//     }

//     // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
//     fs.write(fd, buffer, 0, buffer.length, null, function(err) {
//         if (err) throw 'error writing file: ' + err;
//         fs.close(fd, function() {
//             console.log('wrote the file successfully');
//         });
//     });
// });
