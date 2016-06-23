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
  helpers.infect(teachers, ver, totalInfection);
  helpers.infect(students, ver, totalInfection);
}

function limitedInfection(user, ver) {
  let teachers = user.teachers;
  let students = user.students;
  let school = user.school;
  user.version = ver;
  helpers.infect(teachers, ver, limitedInfection, school);
  helpers.infect(students, ver, limitedInfection, school);
}
