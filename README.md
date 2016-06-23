# Infection

> A project built for Khan Academy's interview process. The objective is to implement a total infection and limited infection algorithm
complete with tests. Total infection is supposed to transfer a feature to all teacher-student pairs. So if the three-eyed raven coaches 
Bran and we want to give the three-eyed raven a new feature, then Bran should also get the new feature. Note that infections are
transitive - if Bran coaches Hodor, then Hodor should get the new feature as well. Also, infections are transferred by both the
“coaches” and “is coached by” relations. Limited infection is supposed to transfer a feature to only a certain amount of users. 

## Testing

### Requirements
- Node 6.2.2
- Mocha 2.5.3
- Chai 3.5.0

### Install
`npm install`

Tests are made with the [Mocha](https://github.com/mochajs/mocha) testing framework and uses [Chai](https://github.com/chaijs/chai) 
for assertion. Tests are located in the virus_spec directory. To run the tests execute `npm test` in your CLI. 

