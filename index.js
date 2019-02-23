const { GraphQLServer } = require("graphql-yoga");
const users = require("./data/user");
const posts = require("./data/posts");

const resolvers = {
    Query: {
        hello(parent, { name }, ctx, info) {
            return name ? `Hello ${name}` : "Hello GraphQl";
        },
        users: () => users,
        skills() {
            return ["HTML", "CSS", "Javascript"];
        },
        posts: () => posts
    }
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
