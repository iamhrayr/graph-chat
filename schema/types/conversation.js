const gql = require('graphql-tag');

module.exports = gql`
    type Conversation {
        id: ID
        messages: [Message]
        participants: [User]
    }

    type Query {
        conversations: [Conversation]
    }

    type Mutation {
        createConversation(participants: [ID]): Conversation
    }
`;
