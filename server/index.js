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

app.get("/api/get", (req, res) =>{

  const sqlSelect = 'SELECT * FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    res.send(result)
  })

  const songName = req.body.songName;
  const songReview = req.body.songReview;

  const sqlInsert = "INSERT INTO song_reviews (songName, songReview) VALUES (?, ?)"
  db.query(sqlInsert, [songName, songReview], (err, result) => {
    console.log(result);
  });
})

app.post("/api/insert", (req, res) =>{

  const songName = req.body.songName;
  const songReview = req.body.songReview;

  const sqlInsert = "INSERT INTO song_reviews (songName, songReview) VALUES (?, ?)"
  db.query(sqlInsert, [songName, songReview], (err, result) => {
    console.log(result);
  });
})

app.listen(3001, () => {
  console.log('se viense');
})