const fs = require('fs');

exports.create = (name) => {
    return  fs.writeFile(name, '', function (err) {
        err ? console.log('Create "'+name+'" : KO') : console.log('Create "'+name+'" : OK');
      });
};

exports.read = (name) => {
    return  fs.readFile(name, 'utf8', (err, data) => {
        err ? console.log('Read "'+name+'" : KO') : console.log(data);
      });
};