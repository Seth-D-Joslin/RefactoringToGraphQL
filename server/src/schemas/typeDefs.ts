// --- UNSURE IF DONE CORRECTLY --- ??? FILE COMPLETED ???
const typeDefs = `
    type User {
    id: ID!
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Int
    }

    type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
    }

    type UserInput {
    username: String
    email: String
    password: String
    }

    type BookInput {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
    }
    
    type Auth {
    token: ID!
    user: User
    }

    type Query {
    users: [User]!
    user(userId: ID!): User
    savedBooks: [Book]!
    me: User
    }

    type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): Book
    removeBook(input: BookInput!): Book
    }
`;

export default typeDefs;
