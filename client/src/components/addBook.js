import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { addBookMutation, getAuthorsQuery, getBooksQuery } from "../queries/queries";

const AddBook = () => {
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [formData, setFormData] = useState({
        bookName: '',
        genre: '',
        authorId: ''
    });
    const [addBook] = useMutation(addBookMutation, {
        refetchQueries: [{ query: getBooksQuery }]
    });

    const [addedBook, setAddedBook] = useState(null);

    const displayAuthors = () => {
        if (loading) {
            return <option disabled>Loading authors</option>;
        } else if (error) {
            return <option>Error: {error.message}</option>;
        } else if (data && data.authors) {
            return data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                    {author.authorName}
                </option>
            ));
        }
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitForm = (e) => {
        e.preventDefault();

        addBook({
            variables: {
                bookName: formData.bookName,
                genre: formData.genre,
                authorId: formData.authorId,
            }
        }).then((response) => {
            const { bookName, genre, authorId } = response.data.addBook;
            setAddedBook({ bookName, genre, authorId });
            setFormData({ bookName: '', genre: '', authorId: '' });
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="form-group">
                <label className="form-label">Book name:</label>
                <input className="form-control" type="text" name="bookName" value={formData.bookName} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-label">Genre:</label>
                <input className="form-control" type="text" name="genre" value={formData.genre} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="form-label">Author:</label>
                <select className="form-select" aria-label="Default select example" name="authorId" value={formData.authorId} onChange={handleChange}>
                    <option value="">Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button className="btn btn-success w-25 mt-3">+</button>
        </form>
    );
};

export default AddBook;
