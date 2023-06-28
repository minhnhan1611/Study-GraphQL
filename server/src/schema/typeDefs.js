import { gql } from "apollo-server";

const typeDefs = gql`
  type Book {
    id: ID
    bookName: String
    genre: String
    authorId: ID
  }

  type Author {
    id: ID
    authorName: String
  }

  type Query {
    books: [Book]
    authors: [Author]
  }

  type Mutation {
    addBook(
      bookName: String!, 
      genre: String!, 
      authorId: ID!, 
    ): Book
    deleteBook(id: ID!): Book
    editBook(
      id: ID!,
      bookName: String!, 
      genre: String!, 
      authorId: ID!
    ): Book
  }
`;

export default typeDefs;


