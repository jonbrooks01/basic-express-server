'use strict'

const supertest = require('supertest')
const { server } = require('../server.js')
const mockRequest = supertest(server);

describe("server routes and functionality", () => {
  test('the / route will send a response of Hello World', async () => {
    const response = await mockRequest.get('/');
    expect(response.text).toBe
  })
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest.get('/mordor').then((results) => {
      expect(results.status).toBe(404);
    });
  })
  it('should respond with a 500 unexpected server error', () => {
    return mockRequest.get('/hello/').then((results) => {
      expect(results.status).toBe(500);
    });
  })
})