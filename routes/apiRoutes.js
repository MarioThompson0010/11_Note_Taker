// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var router = require('express').Router();
var noteData = require('../data/note');
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output"); // get full path to directory output
const outputPath = path.join(OUTPUT_DIR, "../../db/db.json"); // append team.html to directory output folder


// ===============================================================================
// ROUTING
// ===============================================================================
// API GET Requests
// Below code handles when users select a function to perform
// ---------------------------------------------------------------------------
router
  .route('/notes/:id')
  .delete((req, res) => {
    const id = req.params.id;
    fs.readFile(outputPath, (error, data) => {
      error ? console.error(error) : console.log("Success!");
      const notes = JSON.parse(data);
      const tointid = parseInt(id);

      const findIndex = notes.findIndex(element => {
        return (element.id === tointid);
      });

      notes.splice(findIndex, 1);
      fs.writeFileSync(outputPath, JSON.stringify(notes));
      const myNotes = fs.readFileSync(outputPath);
      const readableNotes = JSON.parse(myNotes);
      res.json(readableNotes);
    }
    );
  }
  );

  // non-delete functions of update and read
router
  .route('/notes')
  .get((_req, res) => {
    const deb = 0;
    fs.readFile(outputPath, (error, data) => {
      if (error) {
        console.error(error);
      }

      const notes = JSON.parse(data);
      res.json(notes);
    }
    );
  })
  .post((req, res) => {

    let newNote = req.body;
    let realNewNote = noteData;
    const notes = JSON.parse(fs.readFileSync(outputPath));

    const lastelement = notes.length > 0 ? notes[notes.length -1] : noteData;
    
    let lastelementIndex = lastelement.id + 1;

    realNewNote.id = lastelementIndex;
    realNewNote.title = newNote.title;
    realNewNote.text = newNote.text;

    notes.push(realNewNote);

    fs.writeFile(outputPath, JSON.stringify(notes), (err) => {
      err ? console.error(err) :
        res.json(realNewNote);
    });
  });

module.exports = router;