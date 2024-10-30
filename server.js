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
    if (req.method === 'GET' && req.url === '/') {

        res.send('Welcome to the Bookstore API');
        res.end(JSON.stringify(books));
    }
});

app.post('/add', (req, res) => {
    const { id, title, author, year } = req.body;
    const existingBook = books.find(book => book.id === id);
    if (existingBook) {
        return res.status(400).end('Book with this ID already exists');
    }
    books.push({ id, title, author, year });
    res.end('Book added successfully');
});

app.get('/list', (req, res) => {
    if (req.method === 'GET' && req.url === '/list') {
        res.end(JSON.stringify(books));
    }

});

app.put('/update', (req, res) => {
    if (req.method === 'GET' && req.url === '/updtae') {
        res.end(JSON.stringify(books));
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});