const express = require("express");
const fs = require("fs");
const db = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.static("public"));

// Middleware to parse the JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "./public/index.html");
  res.sendFile(filePath);
});

app.get("/notes", (req, res) => {
  const filePath = path.join(__dirname, "./public/notes.html");
  res.sendFile(filePath);
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.get("/api/notes/:id", (req, res) => {
  res.json(data[Number(req.params.id)]);
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const uniqueId = db.length.toString();
  newNote.id = uniqueId;
  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  let newId = 0;
  console.log(`Deleting note with id ${noteId}`);
  for (let i = 0; i < db.length; i++) {
    if (db[i].id === noteId) {
      db.splice(i, 1);
      break;
    }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

// PORT
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
