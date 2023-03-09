const db = require('../../db/models');

const dynamicTableCreator = (tableName, fields) => {
  const tableFields = {};
  fields.forEach((field) => {
    tableFields[field] = {
      type: db.Sequelize.STRING,
    };
  });
  const tableAttributes = {
    id: {
      type: db.Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ...tableFields,
  };
  console.log('tableAttributes', tableAttributes);
  db.sequelize.define(tableName, tableAttributes, {
    freezeTableName: true,
  });
  db.sequelize.sync()
      .then(() => {
        console.log('Database is synced');
      })
      .catch((err) => {
        console.log('Error syncing database', err);
      });
};

module.exports = {
  dynamicTableCreator,
};
