const db = require("../data");

module.exports = {
    hello(parent, { name }, ctx, info) {
        return name ? `Hello ${name}` : "Hello GraphQl";
    },
    users: () => db.users,
    skills() {
        return ["HTML", "CSS", "Javascript"];
    },
    posts(parent, { author }, ctx, info) {
        if (!author) {
            return db.posts;
        }

        return db.posts.filter(post => post.userId === Number(author));
    },
    post(parent, { id }, ctx, info) {
        return db.posts.find(post => post.id === Number(id));
    }
};
