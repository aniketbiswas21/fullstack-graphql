const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }
  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    owner: User!
  }

  input PetsInput {
    name: String
    type: String
  }

  input NewPetInput {
    name: String!
    type: String!
  }

  input PetInput {
    id: ID!
    name: String
  }

  type Query {
    pets(input: PetsInput): [Pet]!
    pet(input: PetInput): Pet!
  }

  type Mutation {
    newPet(input: NewPetInput!): Pet!
  }
`;

module.exports = typeDefs;
