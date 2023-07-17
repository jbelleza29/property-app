const { gql } = require('apollo-server-express');

module.exports = gql`
  type Property {
    id: Int!
    street: String!
    city: String!
    state: String!
    zip: String!
    rent: Int!
    owner: User!
  }
`;
