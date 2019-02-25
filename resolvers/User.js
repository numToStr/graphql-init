const db = require("../data");

module.exports = {
    posts({ id }, args, ctx, info) {
        return db.posts.filter(post => post.userId === id);
    }
};
