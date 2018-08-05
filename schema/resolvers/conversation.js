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
        lastMessage: (root, args, { models }) => {
            return models.Message
                .findOne({ conversation: root._id })
                .sort({ createdAt: -1 })
                .limit(1);
        },
        participants: (root, args, { models }) => {
            return models.User.find({
                _id: { $in: root.participants },
            });
        },
    },
    Mutation: {
        createConversation: (root, { participants }, { req, models }) => {
            const author = req.user._id;
            const allParticipants = [...participants, author];

            return models.Conversation.findOne({
                participants: allParticipants,
            }).then(foundConv => {
                // check if the conversation between these users does not exist
                if (foundConv) throw new Error('the conversation between these users alredy exists');

                return new models.Conversation({
                    participants: allParticipants,
                }).save();
            });
        },
    },
};
