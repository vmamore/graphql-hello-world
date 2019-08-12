const { ApolloServer, gql, } = require('apollo-server');

const typeDefs = gql`
    type Query {
        hello (name: String):  String
        user: User
    }

    type User {
        id: ID!
        username: String!
    }

    type Error {
        field: String!
        message: String!
    }

    type RegisterResponse {
        errors: [Error]
        user: User
    }

    input UserInfo {
        username: String!
        password: String!
        age: Int
    }

    type Mutation {
        register(userInfo: UserInfo!): RegisterResponse!
        login(userInfo: UserInfo!): String!
    }
`;

const resolvers = {
    User: {
        username: () => ' iam username'
    },
    Query: {
        hello: (parent, { name }) => {
            return `hey ${name}`
        },
        user: () => ({
            id: 1,
            username: 'Bob'
        })
    },
    Mutation: {
        login: (parent, { userInfo: {username} }, context, info) => {
            return username
        },
        register: () => ({
            errors: 
            [
            {
                field: 'username',
                message: 'bad input! =('
            },
            {
                field: 'username2',
                message: 'bad input! =(2'
            }],
            user: {
                id: 1,
                username: "bob"
            }
        })
    }
}

const server = new ApolloServer({ typeDefs, resolvers, context: ({req, res}) => ({}) });

server.listen().then(({url}) => console.log(`server started at ${url}`));