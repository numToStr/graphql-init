const db = require("../data");

module.exports = {
    author({ userId }, args, ctx, info) {
        return db.users.find(user => String(user.id) === String(userId));
    },
    comments({ postId }, args, ctx, info) {
        return db.comments.filter(
            comment => String(comment.post) === String(postId)
        );
    }
};
