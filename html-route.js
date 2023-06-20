const path = require("path");

module.exports = function (app) {
  const path = require("path");

  app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "../public/assets/index.html");
    res.sendFile(filePath);
  });

  app.get("/notes", (req, res) => {
    const filePath = path.join(__dirname, "../public/assets/notes.html");
    res.sendFile(filePath);
  });
};
