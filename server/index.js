const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql");
const fileUpload = require("express-fileupload");

const { Mac, Windows, Remote } = require("../server/Conection");

//const PORT = process.env.PORT || 3001;
const PORT = 3001;

const app = express();

const db = mysql.createPool(Windows);

//app.use(express.static(path.resolve(__dirname, 'build/')))
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM song_reviews";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.end();
    } else {
      res.send(result);
    }
  });
});

app.post("/api/insert", async (req, res) => {
  const sqlInsert =
    "INSERT INTO song_reviews (image, song, artist, review, genre, qualification, user, userId, spotifyId, spotifyUrl, spotifyUri, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sqlInsert,
    [
      req.body.image,
      req.body.song,
      req.body.artist,
      req.body.review,
      req.body.genre,
      req.body.qualification,
      req.body.user,
      req.body.userId,
      req.body.spotifyId,
      req.body.spotifyUrl,
      req.body.spotifyUri,
      req.body.date,
    ],
    async (err, result) => {
      if (!err) {
        req.body.id = result.insertId;
        res.send(req.body);
      } else {
        res.send(err);
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  const sqlDelete = "DELETE FROM song_reviews WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const sqlUpdate =
    "UPDATE song_reviews SET review = ?, qualification = ?  WHERE id = ?";

  db.query(
    sqlUpdate,
    [req.body.review, req.body.qualification, req.params.id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        req.body.id = req.params.id;
        res.send(req.body);
      }
    }
  );
});

app.get("/api/likes/get", (req, res) => {
  const sqlSelect = "SELECT * FROM likes";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.end();
    } else {
      res.send(result);
    }
  });
});

app.post("/api/likes/set", (req, res) => {
  const sqlSelect = "SELECT * FROM likes WHERE userId = ? AND reviewId = ?";
  db.query(sqlSelect, [req.body.userId, req.body.reviewId], (err, likes) => {
    if (likes.length) {
      const sqlUpdate =
        "UPDATE likes SET isLike = ? WHERE userId = ? AND reviewId = ?";

      db.query(
        sqlUpdate,
        [req.body.like, req.body.userId, req.body.reviewId],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      const sqlInsert =
        "INSERT INTO likes (userId, reviewId, isLike) VALUES(?, ?, ?)";

      db.query(
        sqlInsert,
        [req.body.userId, req.body.reviewId, req.body.like],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  });
});

app.get("/api/qualifications/get", (req, res) => {
  const sqlSelect = "SELECT * FROM qualifications";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.end();
    } else {
      res.send(result);
    }
  });
});

app.post("/api/qualifications/set", (req, res) => {
  const sqlSelect =
    "SELECT * FROM qualifications WHERE userId = ? AND reviewId = ?";
  db.query(sqlSelect, [req.body.userId, req.body.reviewId], (err, result) => {
    const likes = result;
    if (likes.length) {
      const sqlUpdate =
        "UPDATE qualifications SET qualification = ? WHERE userId = ? AND reviewId = ?";

      db.query(
        sqlUpdate,
        [req.body.qualification, req.body.userId, req.body.reviewId],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    } else {
      const sqlInsert =
        "INSERT INTO qualifications (userId, reviewId, qualification) VALUES(?, ?, ?)";

      db.query(
        sqlInsert,
        [req.body.userId, req.body.reviewId, req.body.qualification],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build/', 'index.html'));
// });

const server = http.createServer(app);

const io = socketIo(server);

let users = {};

io.on("connection", (socket) => {
  socket.on("updateReviews", (data) => {
    io.sockets.emit("updateReviews", data);
  });

  socket.on("updateActivity", (data) => {
    updateUsersActivity(data);
  });

  socket.on("updateLikes", (data) => {
    io.sockets.emit("updateLikes", data);
  });

  socket.on("updateQualifications", (data) => {
    io.sockets.emit("updateQualifications", data);
  });

  socket.on("new user", (data) => {
    let keys = Object.keys(users);
    socket.user = data.user;
    if (!keys.includes(data.user)) {
      users[socket.user] = socket;
      users[socket.user].instance = 1;
      users[socket.user].data = data;
      updateUsers();
    } else {
      users[socket.user].instance++;
      updateUsers();
    }
  });

  socket.on("disconnect", (data) => {
    if (!socket.user) return;
    users[socket.user].instance--;
    if (users[socket.user].instance == 0) {
      delete users[socket.user];
    }
    updateUsers();
  });

  function updateUsers() {
    const userNames = Object.keys(users).map((e) => {
      return users[e].data;
    });

    io.sockets.emit("users", userNames);
  }

  function updateUsersActivity({ user, activity }) {
    var usersActivity = Object.keys(users).map((e) => {
      return users[e].data;
    });

    usersActivity.map((e) => {
      return e.user == user ? (e.activity = { ...activity }) : e;
    });

    io.sockets.emit("users", usersActivity);
  }
});

server.listen(PORT, () => {});
