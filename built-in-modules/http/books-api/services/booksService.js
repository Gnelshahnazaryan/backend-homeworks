const books = [];

function getAllBooks() {
    return books;
}

function hasBook(id) {
    const book = books.find((b) => b.id === id);
    return book === -1 ? false : true;
}

function getBook(id) {
    const book = books.find((b) => b.id === id);
    return book;
}

function createBook(data) {
    const newBook = {
        id: books.length + 1,
        title: data.title,
        author: data.author,
        year: data.year,
    };

    books.push(newBook);
    return newBook;
}

function updateBook(id, data) {
    const book = getBook(id);

    Object.assign(book, data);
    return book;
}

function deleteBook(id) {
    const index = books.findIndex((b) => b.id === id);

    return books.splice(index, 1);
}

module.exports = {
    getBook,
    hasBook,
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
};
