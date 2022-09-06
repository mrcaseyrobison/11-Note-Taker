// Requirements //
const express = require("express");
const fs = require ("fs");
const dataBase = require("./db/db.json");
const path = require("path");

// Connect Port //
const PORT = process.env.PORT || 3001;
const app = express();

// Express //
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

// HTML routes //
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
    );

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    );

// API Routes //
app.get ('/api/notes', (req, res) => {
    res.json(dataBase.slice(1));
});

app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, dataBase);
    res.json(newNote);
})

// Function to create new note with corresponding id
const createNote = (body, notesArray) => {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray.length;
    notesArray[0]++;
    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, dataBase);
    res.json(true);
})
// Function to delete notes //
const deleteNote = (id, notesArray) => {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];
        if(note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
};

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});
