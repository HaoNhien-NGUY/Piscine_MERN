const fs = require('fs');

exports.create = (name) => {
  return new Promise(function (resolve, reject) {
    fs.writeFile(name, '', (err) => {
      err ? reject('Create "' + name + '" : KO') : resolve(name);
    });
  });
};

exports.read = (name) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(name, 'utf8', (err, data) => {
      err ? reject('Read "' + name + '" : KO') : resolve(data);
    });
  });
};

exports.update = (name, content) => {
  return new Promise(function (resolve, reject) {
    fs.writeFile(name, content, (err) => {
      err ? reject('Update "' + name + '" : KO') : resolve(name);
    });
  });
}

exports.delete = (name) => {
  return new Promise(function (resolve, reject) {
    fs.unlink(name, (err) => {
      err ? reject(('Delete "' + name + '" : KO')) : resolve('Delete "' + name + '" : OK');
    });
  });
}