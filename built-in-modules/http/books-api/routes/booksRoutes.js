const booksService = require("../services/booksService.js");
const getIdFromUrl = require("../utils/url.js");
const {
    validateCreateBook,
    validatePatchBook,
} = require("../validators/bookValidator.js");

function bookRoutes(req, res) {
    // ----- GET /books -----
    if (req.method === "GET" && req.url === "/books") {
        const books = booksService.getAllBooks();
        res.statusCode = 200;
        return res.end(JSON.stringify(books));
    }

    // ----- GET /books/:id -----
    if (req.method === "GET" && req.url.startsWith("/books/")) {
        const id = getIdFromUrl(req.url);
        const book = booksService.getBook(id);
        if (!book) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Not found" }));
        }

        res.statusCode = 200;
        return res.end(JSON.stringify(book));
    }

    // ----- POST /books -----
    if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                const isValidData = validateCreateBook(data);

                if (!isValidData.isValid) {
                    res.statusCode = 400;

                    return res.end(
                        JSON.stringify({ error: isValidData.error }),
                    );
                }

                const newBook = booksService.createBook(data);

                res.statusCode = 201;
                return res.end(JSON.stringify(newBook));
            } catch (err) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
        return;
    }

    // ----- PUT /books/:id -----/
    if (req.method === "PUT" && req.url.startsWith("/books/")) {
        const id = getIdFromUrl(req.url);
        const book = booksService.hasBook(id);
        if (!book) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Resource not found" }));
        }

        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                const isValidData = validateCreateBook(data);

                if (!isValidData.isValid) {
                    res.statusCode = 400;

                    return res.end(
                        JSON.stringify({ error: isValidData.error }),
                    );
                }

                const updatedBook = booksService.updateBook(id, data);
                res.statusCode = 200;

                return res.end(JSON.stringify(updatedBook));
            } catch (err) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
        return;
    }

    //  ----- PATCH /books/:id -----
    if (req.method === "PATCH" && req.url.startsWith("/books/")) {
        const id = getIdFromUrl(req.url);
        const book = booksService.hasBook(id);
        if (!book) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Resource not found" }));
        }

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                const data = JSON.parse(body);
                const isValidData = validatePatchBook(data);

                if (!isValidData.isValid) {
                    res.statusCode = 400;
                    return res.end(
                        JSON.stringify({ error: isValidData.error }),
                    );
                }

                const updatedBook = booksService.updateBook(id, data);
                res.statusCode = 200;
                res.end(JSON.stringify(updatedBook));
            } catch (err) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
        });
        return;
    }

    // ----- DELETE /books/:id -----
    if (req.method === "DELETE" && req.url.startsWith("/books/")) {
        const id = getIdFromUrl(req.url);
        const book = booksService.hasBook(id);
        if (!book) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Resource not found" }));
        }

        booksService.deleteBook(id);
        res.statusCode = 204;
        return res.end();
    }

    // ----- OPTIONS /books -----
    if (req.method === "OPTIONS") {
        res.statusCode = 204;
        res.setHeader("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        return res.end();
    }

    // ----- Fallback (404) -----
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: "Route not found" }));
}

module.exports = bookRoutes;
