const should = require('should');
const request = require('supertest');
const server = require('../../../app');

describe('controllers', function() {

  describe('login', function() {

    describe('GET /login', function() {

      it('should return "Request validation failed: Parameter (username) is required"', function(done) {

        request(server)
          .get('/login')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.exist(err);
            done();
          });
      });

      it('should accept a "username" parameter', function(done) {

        request(server)
          .get('/login')
          .query({ username: 'Scott'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            done();
          });
      });

    });

  });
  
  describe('feed.methods', function() {
    
    describe('POST /registerFeed', function() {
      
      it('should return "Request validation failed: Parameter (feed) failed schema validation"', function(done) {
        
        request(server)
        .post('/registerFeed')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.exist(err);
          done();
        });
      });
      
      it('should accept a "userName, title, URL" parameters', function(done) {
        
        request(server)
        .post('/registerFeed')
        .send({ userName: 'Scott', title: 'testNewFeed', URL:'https://www.upwork.com/ab/feed/topics/rss?securityToken=5d755f102bfe17992c8547baa7a214b9f2ac55dbd9746cb4bf63b990c9ef20461d2c3d00182c0f5edd669a4f6a83e29e53facb86de8f153771be602ebd0df312&userUid=424361730466676736&orgUid=424361730470871041'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
      });
      
    });
    
  });
});
