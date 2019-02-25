const { GraphQLServer } = require("graphql-yoga");

const resolverQuery = require("./resolvers/Query");
const resolverMutation = require("./resolvers/Mutation");
const resolverPost = require("./resolvers/Post");
const resolverUser = require("./resolvers/User");

const resolvers = {
    Query: resolverQuery,
    Mutation: resolverMutation,
    Post: resolverPost,
    User: resolverUser
};

const server = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers
});

server.start(
    {
        port: 4000,
        playground: "/",
        endpoint: "/api",
        subscriptions: "/subscriptions"
    },
    () => console.log("[Server is up]")
);
