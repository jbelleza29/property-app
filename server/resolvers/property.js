const { Property } = require('../database/models');

module.exports = {
  Property: {
    owner(property) {
      return property.getOwner();
    }
  }
}