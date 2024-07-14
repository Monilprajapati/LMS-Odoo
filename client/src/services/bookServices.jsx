import axios from "axios";

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_URL;
console.log(SERVER_DOMAIN);

const getAllBooks = async () => {
   
    const response = await axios.get(
        `${SERVER_DOMAIN}/api/v1/books/all`,
        {},
        { withCredentials: true }
    );
    console.log(response.data.data);
    return response.data.data;
};

const deleteBook = async (bookId) => {
    const response = await axios.delete(
        `${SERVER_DOMAIN}/api/v1/books/${bookId}`,
        {},
        { withCredentials: true }
    );

    return response.data;
}

const addBook = async (formData) => {
    const response = await axios.post(
        `${SERVER_DOMAIN}/api/v1/books/add`,
        formData,
        { withCredentials: true }
    );

    return response.data;
}

export {
    getAllBooks,
    deleteBook,
    addBook
};
