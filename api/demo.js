const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
  }

  union Footwear = Sneaker | Boot

  type User {
    email: String!
    avatar: String
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: ShoeType!
    size: Int!
    user: User!
  }
  type Sneaker implements Shoe {
    brand: ShoeType!
    size: Int!
    sport: String!
    user: User!
  }

  type Boot implements Shoe {
    brand: ShoeType!
    size: Int!
    hasGrip: Boolean!
    user: User!
  }
  input ShoeInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: String!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoeInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const user = {
  id: 1,
  email: "yoda@masters.com",
  avatar: "http://yoda.png",
  shoes: [],
};

const shoes = [
  { brand: "NIKE", size: "12", sport: "basketball", user: 1 },
  { brand: "ADIDAS", size: "14", hasGrip: true, user: 1 },
];

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return shoes;
    },
    me() {
      return user;
    },
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    },
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
  Sneaker: {
    user(shoe) {
      return user;
    },
  },
  Boot: {
    user(shoe) {
      return user;
    },
  },
  User: {
    shoes() {
      return shoes;
    },
  },
  Footwear: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("on port 4000"));
