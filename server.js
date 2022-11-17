//Importing library and files
const express = require("express");
const path = require('path');
const uuid = require('uuid');
const db = require('./db/db.json');
const fs = require('fs');

//Created port
const PORT = process.env.PORT || 3001;

//Calling express
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Getting data at / end point
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
}
);

// Getting data at /notes end point
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
}
);

//Getting data at /api/notes end point
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//Posting data at /api/notes end point and pushing new  notes to db.json file
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

// //Deleting data using id query(params) from the note taker and db.json
// app.delete("/api/notes/:id", (req, res) => {
//     let list = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
//     let noteListId = (req.params.id).toString();

//     list = list.filter(selectedListId =>{
//         return selectedListId.id != noteListId;
//     })

//     //write the updated data to db.json and display the updated note
//     fs.writeFileSync("./db/db.json", JSON.stringify(list));
//     res.json(list);
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})

