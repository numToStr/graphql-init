const { GraphQLServer, PubSub } = require("graphql-yoga");

const db = require("./data");
const middlewares = require("./middlewares");
const resolvers = require("./resolvers");

const PORT = 4000;

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
