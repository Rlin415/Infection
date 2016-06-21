"use strict";

module.exports = {
  create,
  addStudent,
  addTeacher
};

function create(version, id) {
  let user = Object.create(this);
  user.version = version;
  user.id = id;
  user.students = {};
  user.teachers = {};
  return user;
}

function addStudent(student) {
  let teacher = this;
  if (teacher.students[student.id]) return console.log('You already have this student!');
  else {
    teacher.students[student.id] = student;
    student.teachers[teacher.id] = teacher;
  }
}

function addTeacher(teacher) {
  let student = this;
  if (student.teachers[teacher.id]) return console.log('You already have this teacher!');
  else {
    student.teachers[teacher.id] = teacher;
    teacher.students[student.id] = student;
  }
}
