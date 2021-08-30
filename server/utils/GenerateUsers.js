const mysql = require("mysql");
const util = require("util");
const fs = require("fs");
const fetch = require("node-fetch");

const { Mac, Windows, Remote } = require("../Connection");

const db = mysql.createPool(Remote);

const getUsers = () => {
  const sqlSelect = "SELECT userId FROM song_reviews";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const users = [...new Set(result.map((user) => user.userId))];
      getLeftUsers(users);
    }
  });
};

const getLeftUsers = (users) => {
  const sqlSelect = "SELECT userId FROM users";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const existingUsers = result.map((user) => user.userId);
      users = users.filter((user) => !existingUsers.includes(user));
      generateUsers(users);
    }
  });
};

const generateUsers = async (users) => {
  users.forEach(async (userId) => {
    const profile = await (
      await fetch(`https://api.spotify.com/v1/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization:
            "Bearer BQB4SnKX0jipLIYyN-4EcAY7Q_fF2Nfno9z-Tre_VgqC4dPdreDb1i7F_m7N3yEKWHxa9Tup8qnJRX73RIfREH7CzVJEHwBayf2D65GkNSOWsfDndHTq8Dy3odP54rkDyhgNqT4RXfiAYSkPnVTUcrJaCQJ95tAzPEXvlCUATDQtHKKpadk-YJb5mfoeIWvBtD1Sk8z2ueYb1SzGnmFNTw9eOLcjV8_96008KKV2nfCJKMQGd_u98FTg-y0",
        },
      })
    ).json();

    const data = {
      user: profile.display_name,
      userId: profile.id,
      followers: profile.followers ? profile.followers.total : 0,
      country: "",
      image: profile.images.length
        ? profile.images[0].url
        : "http://dissoftec.com/DefaultUserImage.png",
      type: profile.product ? profile.product : "",
      email: "",
      spotifyUrl: profile.external_urls ? profile.external_urls.spotify : "",
      spotifyUri: profile.uri,
    };

    const sqlInsert =
      "INSERT INTO users (user, userId, followers, country, image, type, email, spotifyUrl, spotifyUri, connections) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [...Object.values(data), Date.now()], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });
};

// getUsers();
