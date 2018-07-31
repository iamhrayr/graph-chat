const gql = require('graphql-tag');

module.exports = gql`
    type User {
        id: ID
        email: String
        firstName: String
        lastName: String
        avatar: String
    }

    type Auth {
        token: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String, password: String): Auth
        signup(email: String, password: String): User
    }
`;
