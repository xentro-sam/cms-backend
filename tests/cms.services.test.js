const cmsServices = require('../src/services/cms.services');
const db = require('../db/models/index');
const tableCreation = require('../src/utils/dynamicTableCreation.utils');

describe('cms services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('getContentTypes', () => {
    it('should return an array of content types', async () => {
      const mockValue = [{id: 1, contentTypeName: 'test'}];
      const spyDb = jest.spyOn(db.ContentTypes, 'findAll');
      spyDb.mockResolvedValue(mockValue);
      const contentTypes = await cmsServices.getContentTypes();
      expect(contentTypes).toEqual(mockValue);
      expect(spyDb).toHaveBeenCalledTimes(1);
    });
  });
  describe('createContentType', () => {
    it('should return a content type', async () => {
      const mockValue = {id: 1, contentTypeName: 'test'};
      const spyDbFindOne = jest.spyOn(db.ContentTypes, 'findOne'); spyDbFindOne.mockResolvedValue(null);
      const spyDbCreate = jest.spyOn(db.ContentTypes, 'create'); spyDbCreate.mockResolvedValue(mockValue);
      const spyDbTablesListCreate = jest.spyOn(db.TablesList, 'create'); spyDbTablesListCreate.mockResolvedValue({tableName: 'Table_1'});
      const spyTableCreation = jest.spyOn(tableCreation, 'dynamicTableCreator');
      spyTableCreation.mockImplementation(() => {});
      const contentType = await cmsServices.createContentType('test', ['test', 'test2']);
      expect(contentType).toEqual(mockValue);
      expect(spyDbFindOne).toHaveBeenCalledTimes(1);
      expect(spyDbCreate).toHaveBeenCalledTimes(1);
      expect(spyDbTablesListCreate).toHaveBeenCalledTimes(1);
      expect(spyTableCreation).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if content type already exists', async () => {
      const mockValue = {id: 1, contentTypeName: 'test'};
      const spyDbfindOne = jest.spyOn(db.ContentTypes, 'findOne');
      spyDbfindOne.mockResolvedValue(mockValue);
      await expect(cmsServices.createContentType('test', ['test', 'test2'])).rejects.toThrow();
      expect(spyDbfindOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('getContentTypeEntries', () => {
    it('should return an array of content type entries', async () => {
      const mockValue = [{id: 1, test: 'test', test2: 'test2'}];
      const spyDb = jest.spyOn(db.TablesList, 'findOne');
      spyDb.mockResolvedValue({tableName: 'Table_1'});
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      spyDbModel.mockImplementation(() => {
        return {
          findAll: () => {
            return mockValue;
          },
        };
      });
      const contentTypeEntries = await cmsServices.getContentTypeEntries(1);
      expect(contentTypeEntries).toEqual(mockValue);
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
    });
  });
  describe('createContentTypeEntry', () => {
    xit('should return a content type entry', async () => {
      const contentTypeEntry = await cmsServices.createContentTypeEntry(1, {test: 'test', test2: 'test2'});
      expect(contentTypeEntry).toEqual(expect.any(Object));
    });
  });
  describe('deleteContentTypeEntry', () => {
    xit('should return a content type entry', async () => {
      const contentTypeEntry = await cmsServices.deleteContentTypeEntry(1, 1);
      expect(contentTypeEntry).toEqual(expect.any(Object));
    });
  });
});
