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

    let outside, inside, max, begUser;

    before(function() {
      inside = [];
      outside = [];
      max = 20;
      begUser = User.create('A', 1);

      inside.push(begUser);

      for (let i = 2; i < 20; i++) {
        let user = User.create('A', i);
        for (let j = max; j < max + i; j++) {
          if (Math.floor(Math.random() * 2)) {
            let teacher = User.create('A', j);
            user.addTeacher(teacher);
            inside.push(teacher);
          } else {
            let student = User.create('A', j);
            user.addStudent(student);
            inside.push(student);
          }
        }
        max = max + i;
        inside.push(user);
        Math.floor(Math.random() * 2) ? begUser.addTeacher(user) : begUser.addStudent(user);
      }

      for (let i = max; i < max + 100; i++) {
        let user = User.create('A', i);
        outside.push(user);
      }

    });

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
      virus.totalInfection(begUser, 'B');
      expect(inside).to.satisfy(function(users) {
        for (let user of users) {
          if (user.version !== 'B') return false;
        }
        return true;
      });
    });

    it('should not infect any users that are outside the coaching graph of an infected user', function() {
      expect(outside).to.satisfy(function(users) {
        for (let user of users) {
          if (user.version === 'B') return false;
        }
        return true;
      });
    });

  });
});
