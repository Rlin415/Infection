"use strict";

module.exports = {
  totalInfection,
  limitedInfection
};


const helpers = require('./helpers');

function totalInfection(user, ver) {
  let teachers = user.teachers;
  let students = user.students;
  user.version = ver;
  helpers.double(teachers, students, (person) => {
    if (person.version !== ver) totalInfection(person, ver);
  });
}

function limitedInfection(user, ver) {
  let teachers = user.teachers;
  let students = user.students;
  let school = user.school;
  user.version = ver;
  helpers.double(teachers, students, (person) => {
    if (person.version !== ver && person.school === school) limitedInfection(person, ver);
  });
}
