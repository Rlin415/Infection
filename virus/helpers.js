"use strict";

module.exports = {
  each,
  double
};

function each(set, callback) {
  for (let key in set) {
    callback(set[key], key, set);
  }
}

function double(set1, set2, callback) {
  this.each(set1, (value) => {
    callback(value);
  });
  this.each(set2, (value) => {
    callback(value);
  });
}
