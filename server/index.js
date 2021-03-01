const express = require('express');
const bodyParser = require('body-parser')
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors')
const mysql = require('mysql')
const fileUpload = require('express-fileupload');
const fs = require('fs')
const fetch = require('node-fetch');

const app = express()

const index = require("./routes/index");

let user = undefined;
let user_id = undefined;
let user_data = {};


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'reviewsic'
})


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

  const data = {
    id: 0,
    image: req.body.image,
    songName: req.body.songName,
    artist: req.body.artist,
    songReview: req.body.songReview,
    spotifyUrl: req.body.spotifyUrl,
    calification: req.body.calification,
    author: user,
    author_id: user_id,
  }

  if(req.files){
    file = req.files.file;
  }else{
    url = req.body.file

    image_name = url.slice(24, url.length - 1)
    data.image = image_name + '.jpeg'
  }

  const sqlInsert = "INSERT INTO song_reviews (image, songName, artist, songReview, spotifyUrl, calification, author, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

  db.query(sqlInsert, [data.image, data.songName, data.artist, data.songReview, data.spotifyUrl, data.calification, user, user_id], async (err, result) => {
    if(!err){
      if(!req.files){
        if(!(fs.existsSync(`${__dirname}/../client/public/images/${image_name}.jpeg`))) {

        const response = await fetch(url);
        const buffer = await response.buffer();

        fs.writeFile(`${__dirname}/../client/public/images/${image_name}.jpeg`, buffer, () => {})
          if (!err) {
            data.calification = parseInt(data.calification)
            data.id = parseInt(result.insertId)
            res.send(data);
          }else{
            res.send(err)
          }
        }else{
          res.send('error 103')
        }
      }else{
        if(!(fs.existsSync(`${__dirname}/../client/public/images/${file.name}`))) {
          file.mv(`${__dirname}/../client/public/images/${file.name}`, function (error) {
            if (!error) {
              data.calification = parseInt(data.calification)
              data.id = parseInt(result.insertId)
              res.send(data);
            }else{
              res.send(error)
            }
          });
        }else{
          res.send('error 117')
        }
      }
    }else{
      res.send(err)
    }
  })

})

app.delete('/api/delete/:id/:image', (req, res) => {
  const id = req.params.id;
  const image = req.params.image;

  const path = `${__dirname}/../client/public/images/${image}`

  try {
    fs.unlinkSync(path)

    const sqlDelete = "DELETE FROM song_reviews WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {});

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
    console.log(result)
    if(!err){
      res.send(data)
    }
  });
})

app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let users = {}

io.on("connection", (socket) => {
  socket.on('updateReviews', (data) => {
    io.sockets.emit('updateReviews', data);
  }) 

  if(user){
    if(!(user in users)){
      socket.user = user;
      users[socket.user] = socket;
      users[socket.user].instance = 1
      users[socket.user].data = user_data
      updateUsers()
    }else{
      updateUsers()
      users[user].instance++
    }
    
    socket.on('disconnect', (data) => {
      users[user].instance--
      if(users[user].instance == 0){
        delete users[user];
      }
      updateUsers();
    });

  }else{
    socket.emit('usernames', 'error')
  }

  function updateUsers(){
    const keys = Object.keys(users)

    let new_users = []

    for(let i = 0; i<keys.length;i++){
      let new_user = users[keys[i]].data
      new_users.push(new_user)
    }

    io.sockets.emit('usernames', new_users);
  }

});

server.listen(3001, () => {
})