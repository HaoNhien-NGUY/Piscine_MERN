const fs = require('fs');

exports.create = (name) => {
    return  fs.writeFile(name, '', (err) => {
        err ? console.log('Create "'+name+'" : KO') : console.log('Create "'+name+'" : OK');
      });
};

exports.read = (name) => {
    return  fs.readFile(name, 'utf8', (err, data) => {
        err ? console.log('Read "'+name+'" : KO') : console.log(data);
      });
};

exports.update = (name, content) => {
    return  fs.writeFile(name, content, (err) => {
        err ? console.log('Update "'+name+'" : KO') : console.log('Update "'+name+'" : OK');
      });
}

exports.delete = (name) => {
    return  fs.unlink(name, (err) => {
        err ? console.log('Delete "'+name+'" : KO') : console.log('Delete "'+name+'" : OK');
      });
}