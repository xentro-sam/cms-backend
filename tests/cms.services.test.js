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
    it('should return a content type entry', async () => {
      const mockValue = {id: 1, test: 'test', test2: 'test2'};
      const spyDb = jest.spyOn(db.TablesList, 'findOne');
      spyDb.mockResolvedValue({tableName: 'Table_1'});
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      spyDbModel.mockImplementation(() => {
        return {
          create: () => {
            return mockValue;
          },
        };
      });
      const contentTypeEntry = await cmsServices.createContentTypeEntry(1, {test: 'test', test2: 'test2'});
      expect(contentTypeEntry).toEqual(mockValue);
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
    });
  });
  describe('deleteContentTypeEntry', () => {
    it('should delete a content type entry', async () => {
      const spyDb = jest.spyOn(db.TablesList, 'findOne');
      spyDb.mockResolvedValue({tableName: 'Table_1'});
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      spyDbModel.mockImplementation(() => {
        return {
          destroy: () => {
            return true;
          },
        };
      });
      const contentTypeEntry = await cmsServices.deleteContentTypeEntry(1, 1);
      expect(contentTypeEntry).toEqual({message: 'Entry deleted successfully'});
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if entry does not exist', async () => {
      const spyDb = jest.spyOn(db.TablesList, 'findOne');
      spyDb.mockResolvedValue({tableName: 'Table_1'});
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      spyDbModel.mockImplementation(() => {
        return {
          destroy: () => {
            return false;
          },
        };
      });
      await expect(cmsServices.deleteContentTypeEntry(1, 1)).rejects.toThrow();
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateContentTypeEntry', () => {
    it('should update a content type entry', async () => {
      const mockValue = [{id: 1, test: 'test', test2: 'test2'}];
      const spyDb = jest.spyOn(db.TablesList, 'findOne');
      spyDb.mockResolvedValue({tableName: 'Table_1'});
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      spyDbModel.mockImplementation(() => {
        return {
          update: () => {
            return mockValue;
          },
        };
      });
      const contentTypeEntry = await cmsServices.updateContentTypeEntry(1, 1, {test: 'test', test2: 'test2'});
      expect(contentTypeEntry).toEqual({message: 'Entry updated successfully'});
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if entry does not exist', async () => {
      const spyDb = jest.spyOn(db.TablesList, 'findOne');
      spyDb.mockResolvedValue({tableName: 'Table_1'});
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      spyDbModel.mockImplementation(() => {
        return {
          update: () => {
            return [];
          },
        };
      });
      await expect(cmsServices.updateContentTypeEntry(1, 1, {test: 'test', test2: 'test2'})).rejects.toThrow();
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
    });
  });
  describe('updateContentType', () => {
    it('should add a content type', async () => {
      const mockValue = [{id: 1, test: 'test', test2: 'test2'}];
      const spyDb = jest.spyOn(db.ContentTypes, 'findOne');
      spyDb.mockResolvedValue({id: 1, contentTypeName: 'test', save:
      () => {},
      });
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      const spyDbTablesListFind = jest.spyOn(db.TablesList, 'findOne');
      spyDbTablesListFind.mockResolvedValue({tableName: 'Table_1'});
      spyDbModel.mockImplementation(() => {
        return {
          update: () => {
            return mockValue;
          },
          rawAttributes: {
            test: 'test',
            test2: 'test2',
          },
        };
      });
      const spyTableCreation = jest.spyOn(tableCreation, 'dynamicTableCreator');
      spyTableCreation.mockImplementation(() => {});
      const spySync = jest.spyOn(db.sequelize, 'sync');
      spySync.mockImplementation(() => {});
      const contentType = await cmsServices.updateContentType(1, null, ['test', 'test2'], 'add');
      expect(contentType).toEqual({message: 'ContentType updated successfully'});
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
      expect(spyTableCreation).toHaveBeenCalledTimes(1);
      expect(spyDbTablesListFind).toHaveBeenCalledTimes(1);
      expect(spySync).toHaveBeenCalledTimes(1);
    });
    it('should remove a content type', async () => {
      const mockValue = [{id: 1, test: 'test', test2: 'test2'}];
      const spyDb = jest.spyOn(db.ContentTypes, 'findOne');
      spyDb.mockResolvedValue({id: 1, contentTypeName: 'test', save:
      () => {},
      });
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      const spyDbTablesListFind = jest.spyOn(db.TablesList, 'findOne');
      spyDbTablesListFind.mockResolvedValue({tableName: 'Table_1'});
      spyDbModel.mockImplementation(() => {
        return {
          update: () => {
            return mockValue;
          },
          rawAttributes: {
            test: 'test',
            test2: 'test2',
          },
        };
      });
      const spyTableCreation = jest.spyOn(tableCreation, 'dynamicTableCreator');
      spyTableCreation.mockImplementation(() => {});
      const spySync = jest.spyOn(db.sequelize, 'sync');
      spySync.mockImplementation(() => {});
      const contentType = await cmsServices.updateContentType(1, null, ['test', 'test2'], 'remove');
      expect(contentType).toEqual({message: 'ContentType updated successfully'});
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
      expect(spyTableCreation).toHaveBeenCalledTimes(1);
      expect(spyDbTablesListFind).toHaveBeenCalledTimes(1);
      expect(spySync).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if content type does not exist', async () => {
      const spyDb = jest.spyOn(db.ContentTypes, 'findOne');
      spyDb.mockResolvedValue(null);
      await expect(cmsServices.updateContentType(1, null, ['test', 'test2'], 'add')).rejects.toThrow();
      expect(spyDb).toHaveBeenCalledTimes(1);
    });
    it('should throw an error if only one field exists', async () => {
      const mockValue = [{id: 1, test: 'test', test2: 'test2'}];
      const spyDb = jest.spyOn(db.ContentTypes, 'findOne');
      spyDb.mockResolvedValue({id: 1, contentTypeName: 'test', save:
      () => {},
      });
      const spyDbModel = jest.spyOn(db.sequelize, 'model');
      const spyDbTablesListFind = jest.spyOn(db.TablesList, 'findOne');
      spyDbTablesListFind.mockResolvedValue({tableName: 'Table_1'});
      spyDbModel.mockImplementation(() => {
        return {
          update: () => {
            return mockValue;
          },
          rawAttributes: {
            test: 'test',
          },
        };
      });
      await expect(cmsServices.updateContentType(1, null, ['test'], 'remove')).rejects.toThrow();
      expect(spyDb).toHaveBeenCalledTimes(1);
      expect(spyDbModel).toHaveBeenCalledTimes(1);
      expect(spyDbTablesListFind).toHaveBeenCalledTimes(1);
    });
  });
});
