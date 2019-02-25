const db = require("../data");

module.exports = {
    author({ userId }, args, ctx, info) {
        return db.users.find(user => user.id === userId);
    },
    comments({ postId }, args, ctx, info) {
        return db.comments.filter(comment => comment.post === postId);
    }
};
