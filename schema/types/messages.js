const gql = require('graphql-tag');

module.exports = gql`
    type Message {
        id: ID
        text: String
        from: User
        to: User
    }

    type Query {
        messages(partner: ID): [Message]
    }
`;
