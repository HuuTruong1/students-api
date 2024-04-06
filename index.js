// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy database
let students = [
    { id: 1, name: 'Alice', grade: 'A', address: 'US' },
    { id: 2, name: 'Bob', grade: 'B', address: 'UK' },
    { id: 3, name: 'Huu Truong', grade: 'A+', address: 'Viet Nam' },
    { id: 4, name: 'Bach', grade: 'C-', address: 'French' },
    { id: 5, name: 'Anna', grade: 'B+', address: 'Italy' }
];

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(students);
});

app.get('/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(student => student.id === id);

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.post('/', (req, res) => {
    const { name, grade } = req.body;
    const id = students.length + 1;
    const newStudent = { id, name, grade };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Serve static files (optional)
app.use(express.static('public'));

// Handle not found
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
