const express = require('express');
const bodyParser = require('body-parser')
const http = require("http");
const socketIo = require("socket.io");
const path = require('path');
const cors = require('cors')
const mysql = require('mysql')
const fileUpload = require('express-fileupload');
const fs = require('fs')
const fetch = require('node-fetch');

//const PORT = process.env.PORT || 3001;
const PORT = 3001;

const app = express()

const index = require("./routes/index");

// const dir = '/build/images/'
const dir = '/../client/public/images/'

// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'gf'
// })

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'reviewsic'
})


//app.use(express.static(path.resolve(__dirname, 'build/')))
app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ 
  extended: true
}))
app.use(fileUpload());


app.post("/api/newUser/", (req, res) => {
  user = req.body.nickname
  user_id = req.body.id
  user_data = req.body
  res.send('success')
})

app.get("/api/get", (req, res) =>{

  const sqlSelect = 'SELECT * FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    if(err){
      res.send('error 50');
      res.end();
    }else{
      res.send(result)
    }
  })
})

app.post("/api/insert", async (req, res) =>{

  let file, image_name, url

  console.log('Esto es lo que se resibe')
  console.log(req.body.image)

  const data = {
    id: 0,
    image: req.body.image,
    songName: req.body.songName,
    artist: req.body.artist,
    songReview: req.body.songReview,
    spotifyUrl: req.body.spotifyUrl,
    calification: req.body.calification,
    author: req.body.author,
    author_id: req.body.author_id,
  }

  const sqlInsert = "INSERT INTO song_reviews (image, songName, artist, songReview, spotifyUrl, calification, author, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

  db.query(sqlInsert, [data.image, data.songName, data.artist, data.songReview, data.spotifyUrl, data.calification, data.author, data.author_id], async (err, result) => {
    if(!err){
      data.calification = parseInt(data.calification)
      data.id = parseInt(result.insertId)
      console.log('Se inserta: ')
      console.log(data)
      res.send(data);
    }else{
      console.log('Nos e inserta: ')
      console.log(err)
      res.send(err)
    }
  })

})

app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;

  try {

    const sqlDelete = "DELETE FROM song_reviews WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
      if(err){
        console.log(err)
      }
    })

  } catch(err) {

  }

})

app.put('/api/update/:id', (req, res) => {
  
  const data = {
    id: parseInt(req.params.id),
    image: req.body.image,
    songName: req.body.songName,
    artist: req.body.artist,
    songReview: req.body.songReview,
    spotifyUrl: req.body.spotifyUrl,
    calification: req.body.calification,
    author_id: req.body.author_id || 'NO se ha registrado',
  }
  
  const sqlUpdate = "UPDATE song_reviews SET image = ?, songName = ?, artist = ?, songReview = ?, spotifyUrl = ?, calification = ?  WHERE id = ?";

  db.query(sqlUpdate, [data.image, data.songName, data.artist, data.songReview, data.spotifyUrl, data.calification, data.id], (err, result) => {
    if(!err){
      res.send(data)
    }
  });
})

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build/', 'index.html'));
// });

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let users = {}

io.on("connection", (socket) => {

  socket.on('updateReviews', (data) => {
    io.sockets.emit('updateReviews', data);
  }) 

  socket.on('new user', (data) => {
    let keys = Object.keys(users)
    socket.user = data.nickname
    if(!(keys.includes(data.nickname))){
      users[socket.user] = socket
      users[socket.user].instance = 1
      users[socket.user].data = data
      updateUsers()
    }else{
      users[socket.user].instance++
      updateUsers()
    }
  })

  socket.on('disconnect', (data) => {
    if(!socket.user) return
    users[socket.user].instance--
    if(users[socket.user].instance == 0){
      delete users[socket.user];
    }
    updateUsers();

  })

  function updateUsers(){
    const keys = Object.keys(users)

    let users_ = []

    for(let i = 0; i<keys.length;i++){
      users_.push(users[keys[i]].data)
    }

    io.sockets.emit('usernames', users_);
  }

});

server.listen(PORT, () => {

})