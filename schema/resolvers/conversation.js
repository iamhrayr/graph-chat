module.exports = {
    Query: {
        conversations: (root, args, { models, req }) => {
            const user = req.user._id;
            return models.Conversation.find({ participants: user });
        },
    },
    Conversation: {
        messages: (root, args, { models }) => {
            return models.Message.find({ conversation: root._id });
        },
        participants: (root, args, { models }) => {
            return models.User.find({
                _id: { $in: root.participants },
            });
        },
    },
    Mutation: {
        createConversation: (root, { participants }, { req, models }) => {
            const author = req.user._id.toString();
            const allParticipants = [...participants, author];

            return new models.Conversation({
                participants: allParticipants,
            }).save();
        },
    },
};
