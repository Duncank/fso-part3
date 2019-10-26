const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const phonebook = [
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})