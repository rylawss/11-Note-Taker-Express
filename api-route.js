const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    res.json(data);
  });

  app.get("/api/notes/:id", (req, res) => {
    res.json(data[Number(req.params.id)]);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    const uniqueId = data.length.toString();
    newNote.id = uniqueId;
    data.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    data = data.filter((currentNote) => currentNote.id != noteId);
    for (const currentNote of data) {
      currentNote.id = newId.toString();
      newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
  });
};
