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
  

  const sqlInsert = "INSERT INTO song_reviews (image, song, artist, review, spotifyUrl, qualification, author, author_id, song_id, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

  db.query(sqlInsert, [req.body.image, req.body.song, req.body.artist, req.body.review, req.body.spotifyUrl, req.body.qualification, req.body.author, req.body.author_id, req.body.song_id, req.body.date], async (err, result) => {
    if(!err){
      req.body.id = result.insertId
      res.send(req.body)
    }else{
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
  
  const sqlUpdate = "UPDATE song_reviews SET review = ?, qualification = ?  WHERE id = ?"

  db.query(sqlUpdate, [req.body.review, req.body.qualification, req.params.id], (err, result) => {
    if(err){
      console.log('Error: ')
      console.log(err)
      res.send(err)
    }else{
      req.body.id = req.params.id
      console.log(req.body)
      res.send(req.body)
    }
  })
})

app.put('/api/update/setLikes/:id', (req, res) => {

  console.log('Se recibe por params: ')
  console.log(req.params)

  console.log('Se recibe por body: ')
  console.log(req.body)

  const sqlUpdate = "UPDATE song_reviews SET likes = ?  WHERE id = ?"

  db.query(sqlUpdate, [req.body.likes, req.params.id], (err, result) => {
    if(err){
      console.log('Error: ')
      console.log(err)
      res.send(err)
    }else{
      req.body.id = req.params.id
      console.log(req.body)
      res.send(req.body)
    }
  })
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
    console.log('Este es el recibo: ')
    console.log(data)
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

    console.log('SE emite')

    io.sockets.emit('usernames', users_);
  }

});

server.listen(PORT, () => {

})