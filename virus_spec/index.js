"use strict";

const User = require('../user');
const virus = require('../virus');
const mocha = require('mocha');
const expect = require('Chai').expect;

describe('Virus', function() {

  it('should have a method named totalInfection', function() {
    expect(virus.totalInfection).to.exist;
  });

  it('should have a method named limitedInfection', function() {
    expect(virus.limitedInfection).to.exist;
  });

  describe('#totalInfection', function() {

    let inside, max, begUser;

    before(function() {
      inside = [];
      max = 20;
      begUser = User.create(1, 'A', 'Washington');

      inside.push(begUser);

      for (let i = 2; i < 20; i++) {
        let user = User.create(i, 'A', 'Washington');
        for (let j = max; j < max + i; j++) {
          if (Math.floor(Math.random() * 2)) {
            let teacher = User.create(j, 'A', 'Washington');
            user.addTeacher(teacher);
            inside.push(teacher);
          } else {
            let student = User.create(j, 'A', 'Washington');
            user.addStudent(student);
            inside.push(student);
          }
        }
        max = max + i;
        inside.push(user);
        Math.floor(Math.random() * 2) ? begUser.addTeacher(user) : begUser.addStudent(user);
      }
    });

    it('should be a function', function() {
      expect(virus.totalInfection).to.be.a('function');
    });

    it('should infect a user that is inside the coaching graph of an infected user', function() {
      let teacher = User.create(1, 'A', 'Washington');
      let student = User.create(2, 'A', 'Washington');
      teacher.addStudent(student);
      virus.totalInfection(teacher, 'B');
      expect(student.version).to.equal('B');
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
  });

  describe('#limitedInfection', function() {

    let outside, inside, max, begUser;

    before(function() {
      inside = [];
      outside = [];
      max = 20;
      begUser = User.create(1, 'A', 'Washington');

      inside.push(begUser);

      for (let i = 2; i < 20; i++) {
        let user = User.create(i, 'A', 'Washington');
        for (let j = max; j < max + i; j++) {
          if (Math.floor(Math.random() * 2)) {
            let teacher = User.create(j, 'A', 'Washington');
            user.addTeacher(teacher);
            inside.push(teacher);
          } else {
            let student = User.create(j, 'A', 'Washington');
            user.addStudent(student);
            inside.push(student);
          }
        }
        max = max + i;
        inside.push(user);
        Math.floor(Math.random() * 2) ? begUser.addTeacher(user) : begUser.addStudent(user);
      }

      for (let i = max; i < max + 100; i++) {
        let user = User.create(i, 'A', 'Lincoln');
        let randUser = inside[Math.floor(Math.random() * inside.length)];
        Math.floor(Math.random() * 2) ? randUser.addTeacher(user) : randUser.addStudent(user);
        outside.push(user);
      }
    });

    it('should be a function', function() {
      expect(virus.limitedInfection).to.be.a('function');
    });

    it('should infect a user that is inside the coaching graph and school of an infected user', function() {
      let teacher = User.create(1, 'A', 'Washington');
      let student = User.create(2, 'A', 'Washington');
      teacher.addStudent(student);
      virus.limitedInfection(teacher, 'B');
      expect(student.version).to.equal('B');
    });

    it('should not infect a user that is inside the coaching graph, but outside the school of an infected user', function() {
      let teacher = User.create(1, 'A', 'Washington');
      let student = User.create(2, 'A', 'Lincoln');
      teacher.addStudent(student);
      virus.limitedInfection(teacher, 'B');
      expect(student.version).to.not.equal('B');
    });

    it('should infect all users that are inside the coaching graph and school of an infected user', function() {
      virus.limitedInfection(begUser, 'B');
      expect(inside).to.satisfy(function(users) {
        for (let user of users) {
          if (user.version !== 'B') return false;
        }
        return true;
      });
    });

    it('should not infect any users that are inside the coaching graph, but outside the school of an infected user', function() {
      expect(outside).to.satisfy(function(users) {
        for (let user of users) {
          if (user.version === 'B') return false;
        }
        return true;
      });
    });
  });

});
