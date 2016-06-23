"use strict";

module.exports = {
  infect
};

function infect(list, ver, method, school) {
  if (school) {
    for (let key in list) {
      let user = list[key];
      if (user.school === school && user.version !== ver) method(user, ver);
    }
  } else {
    for (let key in list) {
      let user = list[key];
      if (user.version !== ver) method(user, ver);
    }
  }
}
