const { Sequelize } = require('sequelize');
const client = new Sequelize('postgres://localhost:5432/image-uploader', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});
client
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = client;
