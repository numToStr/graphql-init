const uuidv4 = require("uuid/v4");

module.exports = {
    createUser(parent, { data }, { db }, info) {
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
    updateUser(parent, { where, data }, { db }, info) {
        const index = db.users.findIndex(
            user => String(user.id) === String(where.id)
        );

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
    deleteUser(parent, { where }, { db }, info) {
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
    },
    createPost(
        parent,
        {
            data: { author, title, body }
        },
        { db, pubsub },
        info
    ) {
        const post = {
            id: uuidv4(),
            userId: author,
            title,
            body
        };

        db.posts.unshift(post);

        pubsub.publish("POST", {
            post: {
                type: "CREATED",
                data: post
            }
        });

        return post;
    },
    updatePost(parent, { where, data }, { db, pubsub }, info) {
        const index = db.posts.findIndex(
            post => String(post.id) === String(where.id)
        );

        if (index < 0) {
            throw new Error("Post not found with this ID.");
        }

        const post = {
            ...db.posts[index],
            ...data
        };

        db.posts.splice(index, 1, post);

        pubsub.publish("POST", {
            post: {
                type: "UPDATED",
                data: post
            }
        });

        return post;
    },
    deletePost(parent, { where }, { db, pubsub }, info) {
        const index = db.posts.findIndex(post => String(post.id) === where.id);

        if (index < 0) {
            throw new Error("Post not found with this ID.");
        }

        const post = db.posts[index];

        const commentsNotRelated = db.comments.filter(comment => {
            return String(comment.postId) !== String(post.id);
        });

        db.comments = commentsNotRelated;

        db.posts.splice(index, 1);

        pubsub.publish("POST", {
            post: {
                type: "DELETED",
                data: post
            }
        });

        return post;
    }
};
