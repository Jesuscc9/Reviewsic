const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gf'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ 
  extended: true
}))

app.get("/api/newUser", (req, res) => {
  const sqlSelect = 'SELECT author FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    console.log(result.length)
    res.send(result)
  })
})

app.get("/api/insertUser", (req, res) => {
  
})

app.get("/api/get", (req, res) =>{

  const sqlSelect = 'SELECT * FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })
})

app.post("/api/insert", (req, res) =>{

  const songName = req.body.songName;
  const songReview = req.body.songReview;

  const sqlInsert = "INSERT INTO song_reviews (songName, songReview) VALUES (?, ?)"
  db.query(sqlInsert, [songName, songReview], (err, result) => {
    console.log(result);
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