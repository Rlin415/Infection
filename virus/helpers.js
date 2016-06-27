"use strict";

module.exports = {
  each,
  double
};

function each(list, callback) {
  for (let key in list) {
    callback(list[key], key, list);
  }
}

function double(list1, list2, callback) {
  this.each(list1, (value) => {
    callback(value);
  });
  this.each(list2, (value) => {
    callback(value);
  });
}
