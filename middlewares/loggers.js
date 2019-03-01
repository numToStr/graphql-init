const logInput = async (resolve, root, args, context, info) => {
    console.log(`1. logInput: ${JSON.stringify(args)}`);
    const result = await resolve(root, args, context, info);
    console.log(`5. logInput`);
    return result;
};

const logResult = async (resolve, root, args, context, info) => {
    console.log(`2. logResult`);
    const result = await resolve(root, args, context, info);
    console.log(`4. logResult: ${JSON.stringify(result)}`);
    return result;
};

module.exports = {
    logInput,
    logResult
};
