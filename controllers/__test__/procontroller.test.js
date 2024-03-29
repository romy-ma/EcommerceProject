const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../procontroller');

// Mocking jwt module
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

describe('authenticateToken function', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        'authorization': 'Bearer accessToken123'
      }
    };
    res = {
      sendStatus: jest.fn()
    };
    next = jest.fn();
  });

  it('should return 401 if token is not provided', () => {
    req.headers['authorization'] = undefined;

    authenticateToken(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    authenticateToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('accessToken123', process.env.ACCESS_TOKEN_SECRET, expect.any(Function));
    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('should set req.user and call next() if token is valid', () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 123 });
    });

    authenticateToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('accessToken123', process.env.ACCESS_TOKEN_SECRET, expect.any(Function));
    expect(req.user).toEqual({ userId: 123 });
    expect(next).toHaveBeenCalled();
  });
});
