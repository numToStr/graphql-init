const { GraphQLServer, PubSub } = require("graphql-yoga");

const db = require("./data");
const middlewares = require("./middlewares");
const resolverQuery = require("./resolvers/Query");
const resolverMutation = require("./resolvers/Mutation");
const resolverSubscription = require("./resolvers/Subscription");
const resolverPost = require("./resolvers/Post");
const resolverUser = require("./resolvers/User");

const PORT = 4000;

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
        db,
        pubsub: new PubSub()
    },
    middlewares
});

server.start(
    {
        port: PORT,
        playground: "/",
        endpoint: "/api",
        subscriptions: "/subscriptions"
    },
    () => console.log(`[SERVER]::LISTEN:${PORT}`)
);
