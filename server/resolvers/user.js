const { User } = require('../database/models');

module.exports = {
  Query: {
    async search(root, args, context) {
      return User.findAll({
        limit: 2
      })
    }
  }
}