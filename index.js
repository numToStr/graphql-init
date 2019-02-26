const { GraphQLServer, PubSub } = require("graphql-yoga");

const resolverQuery = require("./resolvers/Query");
const resolverMutation = require("./resolvers/Mutation");
const resolverSubscription = require("./resolvers/Subscription");
const resolverPost = require("./resolvers/Post");
const resolverUser = require("./resolvers/User");

const resolvers = {
    Query: resolverQuery,
    Mutation: resolverMutation,
    Subscription: resolverSubscription,
    Post: resolverPost,
    User: resolverUser
};

const server = new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers,
    context: {
        pubsub: new PubSub()
    }
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
