'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Add this code to automatically create the database if it doesn't exist
if (config.dialect === 'postgres') {
  // Create a temporary Sequelize instance without specifying a database name
  const tempSequelize = new Sequelize(config.username, config.password, '', {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false,
  });

  // Use the temporary Sequelize connection to check if the database exists
  tempSequelize
      .query(`SELECT 1 FROM pg_database WHERE datname = '${config.database}';`)
      .then(([result]) => {
        if (result.length === 0) {
        // The database doesn't exist, so we can create it
          return tempSequelize.query(`CREATE DATABASE "${config.database}";`);
        }
        // The database already exists, no need to create it
        return Promise.resolve();
      })
      .then(() => {
        console.log(`Database "${config.database}" created or already exists`);
        // Now that the database exists, initialize Sequelize with the full configuration
        sequelize = new Sequelize(config.database, config.username, config.password, config);
        initModels();
        runMigrations();
      })
      .catch((error) => {
        console.error('Error creating or checking database:', error);
      });
} else {
  initModels();
  runMigrations();
}

function initModels() {
  fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
        );
      })
      .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

function runMigrations() {
  const {exec} = require('child_process');

  exec('npx sequelize db:migrate', (error, stdout, stderr) => {
    if (error) {
      console.error('Error running migrations:', error);
      return;
    }
    console.log('Migrations executed successfully');
  });
}

module.exports = db;
