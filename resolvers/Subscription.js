module.exports = {
    post: {
        subscribe: (parent, args, { pubsub }, info) =>
            pubsub.asyncIterator("POST")
    }
};
