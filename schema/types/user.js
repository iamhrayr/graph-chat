const gql = require('graphql-tag');

module.exports = gql`
    type User {
        id: ID
        email: String
        firstName: String
        lastName: String
        avatar: String
    }

    type Query {
        me: User
    }
`;
