//Imports fs/util/router/uuid
const fs = require('fs');
const util = require('util');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

//Creates functions using promisify to write and read
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

//Reads notes from db.json
router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf-8')
    .then((data) => {
        res.json(JSON.parse(data));
    })
    .catch((err) => {
        throw err;
    });
});

//Creates a new note by adding the note to db.json
router.post('/notes', (req, res) => {
    const noteFull = req.body;
    noteFull.id = uuidv4();

    readFileAsync('./db/db.json', 'utf-8')
    .then((data) => {
        const priorNotes = JSON.parse(data);
        priorNotes.push(noteFull);
        writeFileAsync('db/db.json', JSON.stringify(priorNotes));
    })
    .catch((err) => {
        throw err;
    });
    res.json(noteFull);
});

//Deletes notes from db.json
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    readFileAsync('./db/db.json', 'utf-8')
    .then((data) => {
        const priorNotes = JSON.parse(data);
        for (let i = 0; i < priorNotes.length; i++) {
        let dataId = priorNotes[i].id;
        if (dataId === id) {
            priorNotes.splice(i, 1);
        }
        }
        writeFileAsync('db/db.json', JSON.stringify(priorNotes));
        res.json(priorNotes);
    })
    .catch((err) => {
        throw err;
    });
});

//exports router to be used elsewhere in app
module.exports = router;