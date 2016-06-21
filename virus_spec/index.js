"use strict";

const User = require('../user');
const virus = require('../virus');
const mocha = require('mocha');
const expect = require('Chai').expect;

describe('Virus', function() {

  it('should have a method named totalInfection', function() {
    expect(virus.totalInfection).to.exist;
  });

  describe('#totalInfection', function() {

    it('should be a function', function() {
      expect(virus.totalInfection).to.be.a('function');
    });

    it('should infect a user that is inside the coaching graph of an infected user', function() {
      let teacher = User.create('A', 1);
      let student = User.create('A', 2);
      teacher.addStudent(student);
      virus.totalInfection(teacher, 'B');
      expect(student.version).to.equal('B');
    });

    it('should not infect a user that\'s outside the coaching graph of an infected user', function() {
      let teacher = User.create('A', 1);
      let student = User.create('A', 2);
      let randomUser = User.create('A', 3);
      teacher.addStudent(student);
      virus.totalInfection(teacher, 'B');
      expect(randomUser.version).to.not.equal('B');
    });

    it('should infect all users that are inside the coaching graph of an infected user', function() {

    });

    it('should not infect any users that are outside the coaching graph of an infected user', function() {

    });

  });
});
