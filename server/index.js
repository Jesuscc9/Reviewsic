const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors')
const mysql = require('mysql')
const fileUpload = require('express-fileupload');

const app = express()

const index = require("./routes/index");

app.use(session({secret: 'secret',}));


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
    console.log(err);
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
  db.query(sqlInsert, [image, songName, artist, songReview, calification, sess.user], (err, result) => {
    res.send('success')
  });

  myFile.mv(`${__dirname}/../client/src/assets/img/${myFile.name}`, function (err) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
    }
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

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let users = {}

io.on("connection", (socket) => {

  if(sess){
    if(socket.user in users) socket.emit('new user', 'error');
    socket.user = sess.user;
    console.log(socket.user);
    users[socket.user] = socket;
    updateUsers();

    socket.on('disconnect', (data) => {
      if(!socket.user) return;
      delete users[socket.user];
      updateUsers();
    });

  }else{
    console.log('Usuario sin definir');
    socket.emit('usernames', 'error');
  }

  function updateUsers(){
    console.log('Se manda: ');
    console.log(Object.keys(users));
    io.sockets.emit('usernames', Object.keys(users));
  }

});



server.listen(3001, () => {
  console.log('se viense');
})