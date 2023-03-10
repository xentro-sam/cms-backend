const cmsControllers = require('../src/controllers/cms.controllers');
const cmsServices = require('../src/services/cms.services');
const CustomError = require('../src/utils/customError.utils');

describe('cms controllers', () => {
  describe('getContentTypes', () => {
    it('should return 200 and content types', async () => {
      const spy = jest.spyOn(cmsServices, 'getContentTypes');
      spy.mockResolvedValueOnce([{
        id: 1,
        contentTypeName: 'test',
      }]);
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.getContentTypes(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{
        id: 1,
        contentTypeName: 'test',
      }]);
    });
    it('should return 500 and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'getContentTypes');
      spy.mockRejectedValueOnce(new Error('test'));
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.getContentTypes(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
    it('should return custom error status code and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'getContentTypes');
      spy.mockRejectedValueOnce(new CustomError(400, 'test'));
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.getContentTypes(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
  });
  describe('createContentType', () => {
    it('should return 201 and content type', async () => {
      const spy = jest.spyOn(cmsServices, 'createContentType');
      spy.mockResolvedValueOnce({
        id: 1,
        contentTypeName: 'test',
      });
      const req = {
        body: {
          contentTypeName: 'test',
          contentTypeFields: ['test'],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.createContentType(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        contentTypeName: 'test',
      });
    });
    it('should return 500 and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'createContentType');
      spy.mockRejectedValueOnce(new Error('test'));
      const req = {
        body: {
          contentTypeName: 'test',
          contentTypeFields: ['test'],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.createContentType(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
    it('should return custom error status code and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'createContentType');
      spy.mockRejectedValueOnce(new CustomError(400, 'test'));
      const req = {
        body: {
          contentTypeName: 'test',
          contentTypeFields: ['test'],
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.createContentType(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
  });
  describe('getContentType', () => {
    it('should return 200 and content type', async () => {
      const spy = jest.spyOn(cmsServices, 'getContentTypeEntries');
      spy.mockResolvedValueOnce({
        id: 1,
        name: 'test',
        email: 'example@example.com',
      });
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.getContentType(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        email: 'example@example.com',
      });
    });
    it('should return 500 and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'getContentTypeEntries');
      spy.mockRejectedValueOnce(new Error('test'));
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.getContentType(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
    it('should return custom error status code and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'getContentTypeEntries');
      spy.mockRejectedValueOnce(new CustomError(400, 'test'));
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.getContentType(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
  });
  describe('createContentTypeEntry', () => {
    it('should return 201 and content type entry', async () => {
      const spy = jest.spyOn(cmsServices, 'createContentTypeEntry');
      spy.mockResolvedValueOnce({
        id: 1,
        name: 'test',
        email: 'example@example.com',
      });
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'test',
          email: 'example@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.createContentTypeEntry(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        name: 'test',
        email: 'example@example.com',
      });
    });
    it('should return 500 and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'createContentTypeEntry');
      spy.mockRejectedValueOnce(new Error('test'));
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'test',
          email: 'example@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.createContentTypeEntry(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
    it('should return custom error status code and error message', async () => {
      const spy = jest.spyOn(cmsServices, 'createContentTypeEntry');
      spy.mockRejectedValueOnce(new CustomError(400, 'test'));
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'test',
          email: 'example@example.com',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await cmsControllers.createContentTypeEntry(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: 'test'});
    });
  });
});
