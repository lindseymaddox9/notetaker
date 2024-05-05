const express = require("express");
const PORT = process.env.PORT || 3001;
const path = require("path");
const notes = require("./db/db.json");
const app = express();
const uuid = require("./helper/uuid");
const fs = require("fs/promises");

// Middleware for parsing JSON and url encoded form data
// Middleware to serve up static assets from the public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// return all saved notes as JSON.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  let newNote;

  if (req.body.title && req.body.text) {
    newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    };

    try {
      const currentNotes = await fs.readFile("./db/db.json", "utf8");

      const currentData = JSON.parse(currentNotes);

      currentData.push(newNote);

      await fs.writeFile("./db/db.json", JSON.stringify(currentData, null, 2));

      notes.push(newNote);

      res.status(201).json(newNote);
    } catch {
      res.status(400).json("unable to save note");
    }
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
