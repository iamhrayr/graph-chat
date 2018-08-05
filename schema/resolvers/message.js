module.exports = {
    // Query: {
    //     messages: (root, { partner }, { models, req }) => {
    //         return models.Message.find({});
    //     },
    // },
    Message: {
        author: (root, args, { models }) => {
            return models.User.findOne({ _id: root.author });
        },
    },
    Mutation: {
        newMessage: (root, { text, conversation }, { req, models }) => {
            if (!req.user) throw new Error('Authorization error');

            // check if conversation exists & sender has access to it
            models.Conversation
                .findById(conversation)
                .then(foundConv => {
                    if (!foundConv) throw new Error('Conversation does not exist');
                    if (!req.user._id.indexOf(conversation.participants)) throw new Error('You do not have permission to the conversation');
                });

            return new models.Message({
                author: req.user._id,
                conversation,
                text,
            }).save();
        },
    },
};
