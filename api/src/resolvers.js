/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input);
    },
    pet(_, { input }, ctx) {
      console.log("Query => pet");
      return ctx.models.Pet.findOne(input);
    },
  },
  Mutation: {
    newPet(_, { input }, ctx) {
      const pet = ctx.models.Pet.create(input);
      return pet;
    },
  },
  Pet: {
    // img(pet) {
    //   return pet.type === "DOG"
    //     ? "https://placedog.net/300/300"
    //     : "http://placekitten.com/300/300";
    // },
    owner(pet, __, ctx) {
      console.log("Pet => owner");
      return ctx.user;
    },
  },
  User: {
    pets(user, __, ctx) {
      console.log("User => pets");
      return ctx.models.Pet.findMany();
    },
  },
};
