const { User, Property } = require('../database/models');
const { Op } = require("sequelize");

module.exports = {
  Query: {
    async search(root, { input }, context) {
      return User.findAll({
        where: {
          [Op.or]: [
            {firstName: { [Op.iLike]: `${input}%`}},
            {lastName:{ [Op.iLike]: `${input}%`}},
          ]
        }
      })
    },
    async getAllUsers(root, args, context) {
      return User.findAll({ limit: 25 });
    }
  },

  User: {
    properties(property) {
      return property.getProperties();
    }
  }
};
