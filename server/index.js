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
  const songName = req.body.songName;
  const image = req.body.image;
  const artist = req.body.artist;
  const songReview = req.body.songReview;
  const spotifyUrl = req.body.spotifyUrl;
  const calification = req.body.calification;


  const sqlInsert = "INSERT INTO song_reviews (image, songName, artist, songReview, spotifyUrl, calification, author) VALUES (?, ?, ?, ?, ?, ?, ?)"
  db.query(sqlInsert, [image, songName, artist, songReview, spotifyUrl, calification, sess.user], (err, result) => {
    if(err){
      res.send('error');
      res.end();
    }
  });

  if(fs.existsSync(`${__dirname}/../client/src/images/${myFile.name}`)) {
    res.send('error')
    res.end();
  } else {
    myFile.mv(`${__dirname}/../client/src/images/${myFile.name}`, function (err) {
      if (err) {
        res.send('error');
        res.end();
      }
    });
  }

  res.send('success')

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

app.put('/api/update', (req, res) => {
  const id = req.body.id;
  const review = req.body.songReview;

  const sqlUpdate = "UPDATE song_reviews SET songReview = ? WHERE id = ?";

  db.query(sqlUpdate, [review, id], (err, res) => {
    if(err){
      res.send('error')
      res.end();
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
    io.sockets.emit('updateReviews', 'siiiamigo');
  }) 

  if(sess){
    if(socket.user in users) socket.emit('usernames', 'error');
    socket.user = sess.user;
    users[socket.user] = socket;
    updateUsers();

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