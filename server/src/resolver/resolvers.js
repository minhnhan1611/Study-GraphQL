import axios from 'axios';
import e from 'cors';

const resolvers = {
  Query: {
    books: async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        return response.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    authors: async () => {
      try {
        const response = await axios.get('http://localhost:3000/authors');
        return response.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
  Mutation: {
    addBook: (parent, { bookName, genre, authorId }) => {
      try {
        const newBook = { bookName, genre, authorId };
        return axios.post('http://localhost:3000/books', newBook)
          .then(response => response.data)

      } catch (error) {
        console.log(error);
        return null;
      }
    },
    deleteBook: (parent, { id }) => {
      try {
        return axios.delete(`http://localhost:3000/books/${id}`)
          .then(response => response.data)
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    editBook: (parent, { id, bookName, genre, authorId }) => {
      try {
        const updatedBook = { bookName, genre, authorId };
        return axios.put(`http://localhost:3000/books/${id}`, updatedBook)
          .then(response => response.data)
      } catch (error) {
        console.log(error)
        return null;
      }
    }
  },
};

export default resolvers;
