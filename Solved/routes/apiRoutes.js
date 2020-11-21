// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var router = require('express').Router();
var noteData = require('../data/note');
const fs = require("fs");
const path = require("path");
let notetaker = "";
let notes = [];

const OUTPUT_DIR = path.resolve(__dirname, "output"); // get full path to directory output
const outputPath = path.join(OUTPUT_DIR, "../../db/db.json"); // append team.html to directory output folder


// ===============================================================================
// ROUTING
// ===============================================================================
// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// ---------------------------------------------------------------------------
router
  .route('/notes/:id')
  .delete((req, res) => {
    const id = req.params.id;
    fs.readFile("../db/db.json", (error, data) => {
      error ? console.error(error) : console.log(data);
      notes = JSON.parse(data);
      const tointid = parseInt(id);

      const findIndex = notes.findIndex(element => {
        return (element.id === tointid);
      });

      let found = null;
      if (findIndex !== -1) {
        found = notes.find(element => {
          return (element.id === tointid);
        });
      }

      notes.splice(findIndex, 1);
      //writeAwesomeNotes(notes)
      fs.writeFileSync(outputPath, JSON.stringify(notes));
      //.then(() => {
      const mynotes = fs.readFileSync(outputPath);
      const jsonnedNotes = JSON.parse(mynotes);
      res.json(jsonnedNotes);
    }
    );
  }
  );

  // "../db/db.json"
router
  .route('/notes')
  .get((_req, res) => {
    const deb = 0;
    fs.readFile(outputPath, (error, data) => {
      if (error){
        console.error(error);
      }

      const notes = JSON.parse(data);
      res.json(notes);
    }
    );
  })
  .post((req, res) => {

    let newNote = req.body;
    //const notes = JSON.parse( fs.readFileSync(outputPath));
    //notes.push(newNote);
    const notes = JSON.parse(fs.readFileSync(outputPath));
    let lastelement = notes[notes.length - 1];
    //const lastid = parseInt( lastelement.id);
    lastelement.id++;
    newNote.id = lastid;
    fs.writeFile(outputPath, JSON.stringify(newNote), (err) => {
      err ? console.error(err) :  
      res.json(newNote);
    });
    // noteData.push(temp);
    // const temp3 = JSON.stringify(temp);
    // //const parsed = JSON.parse(req);
    // fs.writeFile(outputPath, JSON.stringify(noteData, null, '\t'), (err) => {
    //   err ? console.log(err) : console.log('Success!');

    //   fs.readFile(outputPath, (error, data) => {
    //     error ? console.error(error) : console.log(data);
    //     const notes = JSON.parse(data);
    //     res.json(notes);
    //   }
    //   );
    // }
    // );
  });

function readTheFile() {

  fs.readFile(outputPath, (error, data) => {
    error ? console.error(error) : console.log(data);
    const notes = JSON.parse(data);
    res.json(notes);
  }
  );
}

const readAwesomeNotes = () => {

  fs.readFileSync(outputPath, (error, data) => {
    error ? console.error(error) : console.log(data);
    const notes = JSON.parse(data);
    return notes;
    //res.json(notes);
  }
  );

}
const writeAwesomeNotes = (note) => {


  fs.writeFileSync(outputPath, JSON.stringify(note, null, '\t'), (err) => {
    err ? console.log(err) : console.log('Success!');


    // $.ajax({
    //   url: "/api/notes",
    //   data: note,
    //   method: "POST",
    // });
  });

}


function writeToFile(notetaker) {

  fs.writeFile(outputPath, JSON.stringify(notetaker, null, '\t'), (err) => {
    err ? console.log(err) : console.log('Success!');

    // fs.writeFile(fileName, notetaker, (err) =>
    //   err ? console.log(err) : console.log('Success!')
    // );
  });
}



// return fs.readFile(__dirname + filePath, function (err, data) {
//   if (err) throw err;
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.end(data);
// });


// function renderHTML(filePath, res) {
//       fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) => {
//         err ? console.log(err) : console.log('Success!');
//       });
//     }


module.exports = router;