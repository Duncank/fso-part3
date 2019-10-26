const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let phonebook = [
    {
        name: 'Arto Hellas',
        number: '1234567890',
        id: 1,
    },
    {
        name: 'Phoney McPhoneFace',
        number: '303-4994011',
        id: 2,
    },
    {
        name: 'Nanny McFee',
        number: '123-4455-33',
        id: 3,
    },
]

app.get('/api/persons', (req, res) => {
    res.json(phonebook);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(it => it.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(it => it.id !== id);

    res.status(204).end();
});

const randomID = () => {
    return Math.floor(Math.random() * 100);
}

app.post('/api/persons', (req, res) => {
    const body = req.body;

    let errorResponse = false;
    if (!body.name) { errorResponse = 'name is missing'; }
    else if (!body.number) { errorResponse = 'number is missing'; }
    else if (phonebook.find(it => it.name.toLowerCase() === body.name.toLowerCase())) { errorResponse = 'name must be unique'; }

    if (errorResponse) {
        return res.status(400).json({ error: errorResponse })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: randomID()
    }
    phonebook = phonebook.concat(person);

    res.json(person);
})

app.get('/info', (req, res) => {
    const requestTime = new Date().toLocaleString();
    res.send(`
        <div>Phonebook has info for ${phonebook.length} people.</div><br />
        <div>${requestTime}</div>
    `)
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})