module.exports = {
    author({ userId }, args, { db }, info) {
        return db.users.find(user => String(user.id) === String(userId));
    },
    comments({ postId }, args, { db }, info) {
        return db.comments.filter(
            comment => String(comment.post) === String(postId)
        );
    }
};
