module.exports = {
    posts({ id }, args, { db }, info) {
        return db.posts.filter(post => post.userId === id);
    }
};
