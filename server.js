const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    {
        id: 1,
        title: 'The Reluctant Fundamentalist',
        author: 'Mohsin Hamid',
        year: 2007,
    },
    {
        id: 2,
        title: 'Moth Smoke',
        author: 'Mohsin Hamid',
        year: 2000,
    },
    {
        id: 3,
        title: 'My Journey',
        author: 'Muhammad Khaliq',
        year: 2000,
    }
];

app.get('/', (req, res) => {
    console.log(req.query, "Query");
    console.log(req.params, "Params");
    console.log(req.body, "Body");
    console.log(req.headers, "Header");

    res.send('Welcome to the Bookstore API');
});

app.post('/add', (req, res) => {
    const { id, title, author, year } = req.body;
    const existingBook = books.find(book => book.id === id);

    if (existingBook) {
        console.log(`Failed to add book: Book with ID ${id} already exists`);
        return res.status(400).send('Book with this ID already exists');
    }

    books.push({ id, title, author, year });
    console.log(`Book added successfully: ${title} (ID: ${id}, Author: ${author}, Year: ${year})`);
    res.send('Book added successfully');
});

app.get('/list', (req, res) => {
    console.log('GET /list - Request to list all books');

    if (books.length === 0) {
        console.log('No books found');
        return res.status(404).send('No books found');
    }

    res.json(books);
    console.log('Books listed successfully:', books);
});

app.put('/update', (req, res) => {
    const { id, title, author, year } = req.body;
    const existingBook = books.find(book => book.id === id);

    if (!existingBook) {
        console.log(`Failed to update: No book found with ID ${id}`);
        return res.status(404).send('Book not found');
    }

    existingBook.title = title;
    existingBook.author = author;
    existingBook.year = year;

    console.log(`Book updated successfully: ${title} (ID: ${id}, Author: ${author}, Year: ${year})`);
    res.status(200).json({ 'Message': 'Updated' });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === parseInt(id));

    if (bookIndex === -1) {
        console.log(`Failed to delete: No book found with ID ${id}`);
        return res.status(404).send('Book not found');
    }

    const deletedBook = books.splice(bookIndex, 1);
    console.log(`Book deleted successfully: ${deletedBook[0].title} (ID: ${id})`);
    res.send(`Book with ID ${id} deleted successfully`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});