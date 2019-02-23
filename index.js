const { GraphQLServer } = require("graphql-yoga");
const users = require("./data/user");
const posts = require("./data/posts");
const comments = require("./data/comments");

const resolvers = {
    Query: {
        hello(parent, { name }, ctx, info) {
            return name ? `Hello ${name}` : "Hello GraphQl";
        },
        users: () => users,
        skills() {
            return ["HTML", "CSS", "Javascript"];
        },
        posts(parent, { author }, ctx, info) {
            if (!author) {
                return posts;
            }

            return posts.filter(post => post.userId === Number(author));
        },
        post(parent, { id }, ctx, info) {
            return posts.find(post => post.id === Number(id));
        }
    },
    Post: {
        author({ userId }, args, ctx, info) {
            return users.find(user => user.id === userId);
        },
        comments({ postId }, args, ctx, info) {
            return comments.filter(comment => comment.post === postId);
        }
    },
    User: {
        posts({ id }, args, ctx, info) {
            return posts.filter(post => post.userId === id);
        }
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
