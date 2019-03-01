const { logInput, logResult } = require("./loggers");

const openResolvers = {
    Query: {
        hello: logResult
    }
};

const closedResolvers = {
    Query: {
        users: logInput
    }
};

module.exports = [openResolvers, closedResolvers];
