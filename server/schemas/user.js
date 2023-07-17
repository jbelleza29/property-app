const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    properties: [Property!]
  }

  type Query {
    search(input: String!): [User]!
  }
`;
