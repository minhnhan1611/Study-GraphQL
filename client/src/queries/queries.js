import { gql } from '@apollo/client';

const getBooksQuery = gql`
    {
        books {
            id
            bookName
            genre
            authorId
        }
    }
`;

const getAuthorsQuery = gql`
    {
        authors {
            id
            authorName
        }
    }
`;

const addBookMutation = gql`
    mutation($bookName: String!, $genre: String!, $authorId: ID!) {
        addBook(bookName: $bookName, genre: $genre, authorId: $authorId) {
            id
            bookName
            genre
            authorId
        }
    }
`;

const deleteBookMutation = gql`
    mutation($id: ID!) {
        deleteBook(id: $id) {
            id
            bookName
            genre
            authorId
        }
    }
`;

const editBookMutation = gql`
    mutation($id: ID!, $bookName: String!, $genre: String!, $authorId: ID!) {
        editBook(id: $id, bookName: $bookName, genre: $genre, authorId: $authorId) {
            id
            bookName
            genre
            authorId
        }
    }
`

// const getBookQuery = gql`
//     query($id: ID) {
//         book(id: $id) {
//             id
//             bookName
//             genre
//             author {
//                 authorName
//                 id
//                 books {
//                     bookName
//                     id
//                 }
//             }
//         }
//     }
// `;

export { getBooksQuery, getAuthorsQuery, addBookMutation, deleteBookMutation, editBookMutation};
