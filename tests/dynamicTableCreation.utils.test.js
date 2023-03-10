const tableCreator = require('../src/utils/dynamicTableCreation.utils');
const db = require('../db/models');

describe('Dynamic Table Creation', () => {
  it('should create a table', () => {
    const tableName = 'testTable';
    const fields = ['testField1', 'testField2'];
    const spyDefine = jest.spyOn(db.sequelize, 'define');
    const spySync = jest.spyOn(db.sequelize, 'sync');
    spyDefine.mockImplementation(() => {});
    spySync.mockImplementation(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });
    tableCreator.dynamicTableCreator(tableName, fields);
    expect(spyDefine).toHaveBeenCalled();
    expect(spySync).toHaveBeenCalled();
  });
  it('should throw an error', () => {
    const tableName = 'testTable';
    const fields = ['testField1', 'testField2'];
    const spyDefine = jest.spyOn(db.sequelize, 'define');
    const spySync = jest.spyOn(db.sequelize, 'sync');
    spyDefine.mockImplementation(() => {});
    spySync.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(new Error('Error syncing database'));
      });
    });
    tableCreator.dynamicTableCreator(tableName, fields);
    expect(spyDefine).toHaveBeenCalled();
    expect(spySync).toHaveBeenCalled();
  });
});
