module.exports = {
    hello(parent, { name }, { db }, info) {
        return name ? `Hello ${name}` : "Hello GraphQl";
    },
    users: (parent, { author }, { db }, info) => db.users,
    skills() {
        return ["HTML", "CSS", "Javascript"];
    },
    posts(parent, { author }, { db }, info) {
        if (!author) {
            return db.posts;
        }

        return db.posts.filter(post => post.userId === Number(author));
    },
    post(parent, { id }, { db }, info) {
        return db.posts.find(post => post.id === Number(id));
    }
};
