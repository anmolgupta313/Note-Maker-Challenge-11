const express = require("express");
const path = require('path');
const uuid = require('uuid');
const db = require('./db/db.json');
const fs = require('fs');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
}
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
}
);

app.get('/api/notes', (req, res) => {
  res.json(db);
})


app.post('/api/notes', (req, res) => {
  let data = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  };

  db.push(data);

  res.json(db);
  fs.writeFile('./db/db.json', JSON.stringify(db),
    (err, text) => {
      if (err) {
        console.log(err);
        return
      }
      console.log("Success");
    });
})

// app.delete("/api/notes/:id", function(req, res) {
//   let savedNotes = db;
//   let noteID = req.params.id;
//   let newID = 0;
//   console.log(`Deleting note with ID ${noteID}`);
//   savedNotes = savedNotes.filter(currNote => {
//       return currNote.id != noteID;
//   })
  
//   for (currNote of savedNotes) {
//       currNote.id = newID.toString();
//       newID++;
//   }

//   fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
//   res.json(savedNotes);
// })

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})

