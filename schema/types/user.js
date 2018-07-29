const gql = require('graphql-tag');

module.exports = gql`
    type User {
        name: String
    }

    type Query {
        users: [User]
    }
`;
