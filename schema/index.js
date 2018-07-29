const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

// load and combine all types and resolvers from their folders
const typesArray = fileLoader(path.join(__dirname, './types'));
const typeDefs = mergeTypes(typesArray, { all: true });
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

// create executable schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
