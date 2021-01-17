const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors')
const mysql = require('mysql')
const fileUpload = require('express-fileupload');
const fs = require('fs')

const app = express()

const index = require("./routes/index");

let user = undefined;


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'gf'
})


app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ 
  extended: true
}))
app.use(fileUpload());

var sess;
app.get("/api/newUser/:user", (req, res) => {
  user = req.params.user;
  res.send('success');
})

app.get('/api/getUser/', (req, res) => {
  res.send(user)
})

app.get("/api/get", (req, res) =>{

  const sqlSelect = 'SELECT * FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    if(err){
      console.log('Hubo un error')
      console.log(err)
      res.send('error');
      res.end();
    }else{
      res.send(result)
    }
  })
})

app.post("/api/insert", (req, res) =>{

  const myFile = req.files.file;

  const data = {
    id: 0,
    image: req.body.image,
    songName: req.body.songName,
    artist: req.body.artist,
    songReview: req.body.songReview,
    spotifyUrl: req.body.spotifyUrl,
    calification: req.body.calification,
    author: user,
  }


  const sqlInsert = "INSERT INTO song_reviews (image, songName, artist, songReview, spotifyUrl, calification, author) VALUES (?, ?, ?, ?, ?, ?, ?)"
  db.query(sqlInsert, [data.image, data.songName, data.artist, data.songReview, data.spotifyUrl, data.calification, user], (err, result) => {
    if(err){
      res.send('query error');
      console.log(err);
      res.end();
    }else{
      if(fs.existsSync(`${__dirname}/../client/public/images/${myFile.name}`)) {
        res.send('existe el archivo error')
        res.end();
      } else {
        myFile.mv(`${__dirname}/../client/public/images/${myFile.name}`, function (err) {
          if (err) {
            res.send('no se puede poner la imagen error');
            res.end();
          }else{
            data.calification = parseInt(data.calification)
            data.id = parseInt(result.insertId)
            res.send(data);
            console.log('Se inserta correctamente');
          }
        });
      }
    }
  });



})

app.delete('/api/delete/:id/:image', (req, res) => {
  const id = req.params.id;
  const image = req.params.image;

  const path = `${__dirname}/../client/public/images/${image}`

  try {
    fs.unlinkSync(path)
  } catch(err) {
    res.send('error');
    res.end();
    console.log('Hubo un error intentando borrar la imagen')
    console.log(err)
  }

  const sqlDelete = "DELETE FROM song_reviews WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
    if(err){
      console.log('Error en elq uery')
      console.log(err)
      res.send('error');
      res.end();
    }else{
      res.send('success')
    }
  });

})

app.put('/api/update/:id', (req, res) => {

  console.log('nuevo: ');
  
  const data = {
    id: parseInt(req.params.id),
    image: req.body.image,
    songName: req.body.songName,
    artist: req.body.artist,
    songReview: req.body.songReview,
    spotifyUrl: req.body.spotifyUrl,
    calification: req.body.calification,
  }
  
  console.log(data);
  
  const sqlUpdate = "UPDATE song_reviews SET image = ?, songName = ?, artist = ?, songReview = ?, spotifyUrl = ?, calification = ?  WHERE id = ?";

  db.query(sqlUpdate, [data.image, data.songName, data.artist, data.songReview, data.spotifyUrl, data.calification, data.id], (err, result) => {
    if(err){
      res.send('error')
      res.end();
    }else{
      console.log('data: ');
      console.log(data);
      res.send(data)
    }
  });
})

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let users = {}

io.on("connection", (socket) => {

  console.log('NEW CONNECTION: ' + socket.id)

  socket.on('updateReviews', (data) => {
    io.sockets.emit('updateReviews', data);
  }) 

  if(user){
    if(!(user in users)){
      socket.user = user;
      users[socket.user] = socket;
      users[socket.user].instance = 1

      console.log('NEW USER')
      updateUsers()
    }else{
      updateUsers()
      users[user].instance++
      console.log('ya existe ese user: ' + users[user].instance)
    }
    
    socket.on('disconnect', (data) => {
      users[user].instance--
      if(users[user].instance == 0){
        delete users[user];
        console.log('DISCONNECTED TRUER')
      }
      updateUsers();
    });

  }else{
    console.log('El usuario no está definido')
    socket.emit('usernames', 'error')
  }

  function updateUsers(){
    console.log('These are the users: ')
    console.log(Object.keys(users))
    io.sockets.emit('usernames', Object.keys(users));
  }

});

server.listen(3001, () => {
  console.log('Listening on port: 3001');
})