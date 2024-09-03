require('dotenv').config();

module.exports = {
    development: {
      username: 'root',
      password: '(9db91u4Hbma',
      database: 'partycardsdb',
      host: 'localhost',
      dialect: 'mysql',
    },
    test: {
      username: 'root',
      password: '(9db91u4Hbma',
      database: 'database_test',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: process.env.SQLusername,
      password: process.env.SQLpassword,
      database: process.env.SQLdatabase,
      host: process.env.SQLhost,
      dialect: 'mysql',
    }
  };