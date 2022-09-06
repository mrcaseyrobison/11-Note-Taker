// Requirements //

const express = require("express");
const fs = require ("fs");
const db = require("./db/db.json");
const path = require('path')

// Connect Port //
const PORT = process.env || 30001;
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

