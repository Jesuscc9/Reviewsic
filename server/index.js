const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const fileUpload = require('express-fileupload');

const app = express()

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gf'
})


app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ 
  extended: true
}))
app.use(fileUpload());

app.get("/api/newUser", (req, res) => {
  const sqlSelect = 'SELECT author FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    console.log(result.length)
    res.send(result)
  })
})

app.get("/api/get", (req, res) =>{

  const sqlSelect = 'SELECT * FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post("/api/insert", (req, res) =>{

  const myFile = req.files.file;
  console.log(myFile);
  const songName = req.body.songName;
  const image = req.body.image;
  const artist = req.body.artist;
  const songReview = req.body.songReview;
  const calification = req.body.calification;


  const sqlInsert = "INSERT INTO song_reviews (image, songName, artist, songReview, calification, author) VALUES (?, ?, ?, ?, ?, ?)"
  db.query(sqlInsert, ['cults.jpeg', songName, artist, songReview, calification, 'jesu'], (err, result) => {
    console.log(result);
  });

  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({name: myFile.name, path: `/${myFile.name}`});
});
    
})

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;

  const sqlDelete = "DELETE FROM song_reviews WHERE id = ?";

  db.query(sqlDelete, id, (err, res) => {
    if(err) console.log('Error: ' + err);
  });
})

app.put('/api/update', (req, res) => {
  const id = req.body.id;
  const review = req.body.songReview;

  const sqlUpdate = "UPDATE song_reviews SET songReview = ? WHERE id = ?";

  db.query(sqlUpdate, [review, id], (err, res) => {
    if(err) console.log('Error: ' + err);
  });
})


app.listen(3001, () => {
  console.log('se viense');
})