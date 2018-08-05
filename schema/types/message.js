const gql = require('graphql-tag');

module.exports = gql`
    type Message {
        id: ID
        text: String
        author: User
    }

    # type Query {
    #     messages(partner: ID): [Message]
    # }

    type Mutation {
        newMessage(text: String, conversation: ID): Message
    }
`;
