const express = require("express");
const PORT = 3001;
const path = require("path");
const notes = require("./db/db.json");
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware to serve up static assets from the public folder
app.use(express.static("public"));

// * `GET /api/notes` should read the `db.json` file and
// return all saved notes as JSON.

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// * `POST /api/notes` should receive a new note to save on
// the request body, add it to the `db.json` file, and then
// return the new note to the client.

app.post("/api/notes", (req, res) => {
res.sendFile('/public/index.html')
});

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };
  
  module.exports = { readFromFile, writeToFile, readAndAppend };

// * `GET /notes` should return the `notes.html` file.

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// * `GET *` should return the `index.html` file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

// // (look into npm packages that could do this for you).
// //uuid package
// //const { v4: uuidv4 } = require('uuid');

// //const userId=uuidv4();
// //console.log(userId); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
