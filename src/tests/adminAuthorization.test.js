// Test scripts built with mock requests to ensure admin access and middleware work as intended.

require('dotenv').config();
const jwt = require('jsonwebtoken');
const adminAuthorization = require('../utils/adminAuthorization');

describe('Admin Authorization Middleware', () => {
  it('should allow access with a valid admin token', () => {
    const reqMock = {
      headers: {
        authorization: 'Bearer ' + jwt.sign({ id: 1, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      },
    };
    const resMock = {};
    const nextMock = jest.fn();

    adminAuthorization(reqMock, resMock, nextMock);

    expect(nextMock).toHaveBeenCalled();
  });

  it('should deny access with a non-admin token', () => {
    const reqMock = {
      headers: {
        authorization: 'Bearer ' + jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' }),
      },
    };
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const nextMock = jest.fn();

    adminAuthorization(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(403);
    expect(resMock.json).toHaveBeenCalledWith({ error: 'Forbidden: Admins only' });
    expect(nextMock).not.toHaveBeenCalled();
  });

  it('should deny access without a token', () => {
    const reqMock = {
      headers: {},
    };
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const nextMock = jest.fn();

    adminAuthorization(reqMock, resMock, nextMock);

    expect(resMock.status).toHaveBeenCalledWith(401);
    expect(resMock.json).toHaveBeenCalledWith({ error: 'Access denied. No token provided.' });
    expect(nextMock).not.toHaveBeenCalled();
  });
});