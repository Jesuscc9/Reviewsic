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

app.use(session({secret: 'secret',     resave: true,
saveUninitialized: true}));


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

var sess;
app.get("/api/newUser/:user", (req, res) => {
  sess = req.session;
  sess.user = req.params.user;
  res.send('success');
})

app.get("/api/get", (req, res) =>{

  const sqlSelect = 'SELECT * FROM song_reviews';
  db.query(sqlSelect, (err, result) => {
    if(err){
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
    author: sess.user,
  }
  const user = sess.user;


  const sqlInsert = "INSERT INTO song_reviews (image, songName, artist, songReview, spotifyUrl, calification, author) VALUES (?, ?, ?, ?, ?, ?, ?)"
  db.query(sqlInsert, [data.image, data.songName, data.artist, data.songReview, data.spotifyUrl, data.calification, user], (err, result) => {
    if(err){
      res.send('query error');
      res.end();
    }else{
      console.log('Resultado: ');
      console.log(result);
      if(fs.existsSync(`${__dirname}/../client/src/images/${myFile.name}`)) {
        res.send('existe el archivo error')
        res.end();
      } else {
        myFile.mv(`${__dirname}/../client/src/images/${myFile.name}`, function (err) {
          if (err) {
            res.send('no se puede poner la imagen error');
            res.end();
          }else{
            console.log('Se inserta exitosamente');
            data.calification = parseInt(data.calification)
            data.id = parseInt(result.insertId)
            res.send(data);
          }
        });
      }
    }
  });



})

app.delete('/api/delete/:id/:image', (req, res) => {
  const id = req.params.id;
  const image = req.params.image;

  const path = `${__dirname}/../client/src/images/${image}`

  try {
    fs.unlinkSync(path)
  } catch(err) {
    res.send('error');
    res.end();
  }

  const sqlDelete = "DELETE FROM song_reviews WHERE id = ?";

  db.query(sqlDelete, id, (err, res) => {
    if(err){
      res.send('error');
      res.end();
    }
  });
  
  res.send('success');

})

app.put('/api/update/:id', (req, res) => {
  
  const id = req.params.id;
  const image = req.body.image;
  const song = req.body.songName;
  const artist = req.body.artist;
  const review = req.body.songReview;
  const spotifyUrl = req.body.spotifyUrl;
  const calification = req.body.calification;

  console.log({
    id,
    image,
    song,
    artist,
    review,
    spotifyUrl,
    calification,
    author: sess.user,
  })

  const sqlUpdate = "UPDATE song_reviews SET image = ?, songName = ?, artist = ?, songReview = ?, spotifyUrl = ?, calification = ?, author = ? WHERE id = ?";

  db.query(sqlUpdate, [image, song, artist, review, spotifyUrl, calification, sess.user, id], (err, res) => {
    if(err){
      console.log('Hubo un error');
      console.log(err);
      res.send('error')
      res.end();
    }else{
      console.log('Se actualiza correctamente')
    }
  });

  res.send('success')
})

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let users = {}

io.on("connection", (socket) => {

  socket.on('updateReviews', (data) => {
    console.log('Nuevas actualizaciones: ');
    console.log(data);
    io.sockets.emit('updateReviews', data);
  }) 

  if(sess){
    if(!(sess.user in users)){
      socket.user = sess.user;
      users[socket.user] = socket;
      updateUsers();
    }else{
      socket.emit('usernames', 'error');
    }
    
    socket.on('disconnect', (data) => {
      if(!socket.user) return;
      delete users[socket.user];
      updateUsers();
    });

  }else{
    socket.emit('usernames', 'error');
  }

  function updateUsers(){
    io.sockets.emit('usernames', Object.keys(users));
  }

});



server.listen(3001, () => {
  console.log('Listening on port: 3001');
})