import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getBooksQuery, deleteBookMutation, editBookMutation } from '../queries/queries';

export default function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [deleteBook] = useMutation(deleteBookMutation, {
        refetchQueries: [{ query: getBooksQuery }]
    });
    const [editBook] = useMutation(editBookMutation, {
        refetchQueries: [{ query: getBooksQuery }]
    });
    const [editingBook, setEditingBook] = useState(null);

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleDelete = (id) => {
        deleteBook({ variables: { id } })
            .then(() => {
                alert('Book deleted successfully');
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleEdit = (book) => {
        setEditingBook(book);
    };

    const handleSave = (book) => {
        editBook({
            variables: {
                id: book.id,
                bookName: book.bookName,
                genre: book.genre,
                authorId: book.authorId
            }
        })
            .then(() => {
                alert('Book updated successfully');
                setEditingBook(null);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleCancel = () => {
        setEditingBook(null);
    };

    return (
        <div>
            <ul id="book-list">
                {data.books.map((book) => (
                    <li key={book.id}>
                        {editingBook && editingBook.id === book.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingBook.bookName}
                                    onChange={(e) => setEditingBook({ ...editingBook, bookName: e.target.value })}
                                />
                                <input
                                    type="text"
                                    value={editingBook.genre}
                                    onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
                                />
                                <button className='btn btn-success' onClick={() => handleSave(editingBook)}>Save</button>
                                <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                {book.bookName}
                                <div>
                                    <button className='btn btn-danger' onClick={() => handleDelete(book.id)}>Delete</button>
                                    <button className='btn btn-primary' onClick={() => handleEdit(book)}>Edit</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
