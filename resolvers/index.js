const resolverQuery = require("./Query");
const resolverMutation = require("./Mutation");
const resolverSubscription = require("./Subscription");
const resolverPost = require("./Post");
const resolverUser = require("./User");

const resolvers = {
    Query: resolverQuery,
    Mutation: resolverMutation,
    Subscription: resolverSubscription,
    Post: resolverPost,
    User: resolverUser
};

module.exports = resolvers;
