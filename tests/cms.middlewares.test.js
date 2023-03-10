const cmsMiddlewares = require('../src/middlewares/cms.validations');

describe('CMS Middlewares', () => {
  it('should validate an id', () => {
    const req = {
      params: {
        id: '1',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();
    cmsMiddlewares.validateId(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should not validate an id', () => {
    const req = {
      params: {
        id: 'a',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();
    cmsMiddlewares.validateId(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
  it('should validate an entryId', () => {
    const req = {
      params: {
        id: '1',
        entryId: '1',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();
    cmsMiddlewares.validateId(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should not validate an entryId', () => {
    const req = {
      params: {
        id: '1',
        entryId: 'a',
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();
    cmsMiddlewares.validateId(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
