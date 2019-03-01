const { logInput, logResult } = require("./loggers");

const openResolvers = {
    Query: {
        hello: logInput
    }
};

const closedResolvers = {
    Query: {
        users: logResult
    }
};

module.exports = [openResolvers, closedResolvers];
