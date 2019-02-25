const uuidv4 = require("uuid/v4");
const db = require("../data");

module.exports = {
    createUser(parent, { data }, ctx, info) {
        const userExists = db.users.find(
            user => user.email === data.email || user.username === data.username
        );

        if (userExists) {
            throw new Error("User is already exists with this username/email.");
        }

        const user = {
            id: uuidv4(),
            ...data
        };

        db.users.unshift(user);

        return user;
    },
    updateUser(parent, { where, data }, ctx, info) {
        const index = db.users.findIndex(user => String(user.id) === where.id);

        if (index < 0) {
            throw new Error("User not found with this ID.");
        }

        const user = {
            ...db.users[index],
            ...data
        };

        db.users.splice(index, 1, user);

        return user;
    },
    deleteUser(parent, { where }, ctx, info) {
        const index = db.users.findIndex(user => String(user.id) === where.id);

        if (index < 0) {
            throw new Error("User not found with this ID.");
        }

        const user = db.users[index];

        const postNotRelated = db.posts.filter(post => {
            const isNotMatch = String(post.userId) !== String(user.id);

            if (!isNotMatch) {
                db.comments = db.comments.filter(
                    comment => String(comment.postId) !== String(post.id)
                );
            }

            return isNotMatch;
        });

        db.posts = postNotRelated;

        db.users.splice(index, 1);

        return user;
    }
};
