const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
    { id: 1, name: "Book 1", description: "This is the first book." },
    { id: 2, name: "Book 2", description: "This is the second book." }
];

app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');
    res.json(item);
});

app.get('/items/search', (req, res) => {
    const { name } = req.query;
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    res.json(filteredItems);
});

app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;

    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found.');

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});