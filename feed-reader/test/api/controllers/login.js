var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('login', function() {

    describe('GET /login', function() {

      it('should return a default string', function(done) {

        request(server)
          .get('/login')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            done();
          });
      });

      it('should accept a name parameter', function(done) {

        request(server)
          .get('/login')
          .query({ name: 'Scott'})
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
  
  describe('registerFeed', function() {
    
    describe('POST /registerFeed', function() {
      
      it('should return a saved feed ', function(done) {
        
        request(server)
        .get('/login')
        .param({ username: 'Scott', title: 'test_1', URL: '/link/url'})
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
