// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var router = require('express').Router(); // express router
var noteData = require('../data/note'); // get object definition for a note
const fs = require("fs"); // file manager
const path = require("path"); // path manager

// output is not the right directory, but it's too late to change that now.  Anyway,
// the join seems to overwrite the incorrect directory of output.
const OUTPUT_DIR = path.resolve(__dirname, "output"); // get full path to directory output, which will be 
// overwritten by the path.join statement to go to the correct directory
const outputPath = path.join(OUTPUT_DIR, "../../db/db.json"); // append team.html to directory output folder


// ===============================================================================
// ROUTING
// ===============================================================================
// API GET Requests
// Below code handles when users select a function to perform
// ---------------------------------------------------------------------------
router
  .route('/notes/:id') // front-end sends id
  .delete((req, res) => { // delete
    const id = req.params.id; // get id parameter 
    fs.readFile(outputPath, (error, data) => { // read the file async
      error ? console.error(error) : console.log("Success!"); // all good?
      const notes = JSON.parse(data); // make data readable by human eyes
      const tointid = parseInt(id); // make into integer if not already

      // find the index of note we want to delete
      const findIndex = notes.findIndex(element => {
        return (element.id === tointid); // equal to incoming id?
      });

      notes.splice(findIndex, 1); // splice deletes at index findIndex for 1 
      fs.writeFileSync(outputPath, JSON.stringify(notes)); // send to output file; save it.
      const myNotes = fs.readFileSync(outputPath); // get a fresh read, even though I think the front-end does another read anyway.
      const readableNotes = JSON.parse(myNotes); // readable to humans
      res.json(readableNotes); // send array to front-end
    }
    );
  }
  );

  // non-delete functions of update and read
router
  .route('/notes') // get notes
  .get((_req, res) => {
    
    fs.readFile(outputPath, (error, data) => { // read the notes file
      if (error) { // hopefull no error
        console.error(error);
      }

      const notes = JSON.parse(data); // see the data
      res.json(notes); // send to client
    }
    );
  })
  .post((req, res) => { // append a new note to the file

    let newNote = req.body; // get data
    let realNewNote = noteData; // new note that will get saved to disk
    const notes = JSON.parse(fs.readFileSync(outputPath)); // read file for fresh read

    const lastelement = notes.length > 0 ? notes[notes.length -1] : noteData; // get object we'll be writing to file
    
    let lastelementIndex = lastelement.id + 1; // incremenet id by 1 to get new id

    realNewNote.id = lastelementIndex; // assign new id
    realNewNote.title = newNote.title; // new title
    realNewNote.text = newNote.text; // new text

    notes.push(realNewNote); // push to array of notes

    fs.writeFile(outputPath, JSON.stringify(notes), (err) => { // write to disk
      err ? console.error(err) :
        res.json(realNewNote); // send back array
    });
  });

module.exports = router; // give router to server.js
