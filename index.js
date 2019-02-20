const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
    type Query {
        hello(name: String): String!
        user: User
        skills: [String!]!,
        posts: [Post!]!
    }

    type User {
        name: String!
        age: Int!
        student: Boolean!
        ttl: Float!
    }

    type Post {
        title: String!
        body: String!
    }
`;

const resolvers = {
    Query: {
        hello(parent, { name }, ctx, info) {
            return name ? `Hello ${name}` : "Hello GraphQl";
        },
        user() {
            return {
                name: "Vikas Raj",
                age: 22,
                student: false,
                ttl: 20.3
            };
        },
        skills() {
            return ["HTML", "CSS", "Javascript"];
        },
        posts() {
            return [
                {
                    title: "First Post",
                    body: "First Body"
                },
                {
                    title: "Second Post",
                    body: "Second Body"
                }
            ];
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(
    {
        port: 5000,
        playground: "/play"
    },
    () => console.log("[Server is up]")
);
