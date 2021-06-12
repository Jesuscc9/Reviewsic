import Axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Cookies from "js-cookie";

const token = Cookies.get("spotifyAuthToken");

export const spotifyApi = {
  config: {
    headers: {
      Authorization: "Bearer " + token,
    },
  },
  authorId: "",
  data: {
    profileImage: "",
    playlistId: "",
  },
  songData: {
    author_id: "",
    author: "",
  },
  likedSongs: [],
  user: {},
  get: async function () {
    const userData = await Axios.get(
      "https://api.spotify.com/v1/me",
      this.config
    );

    const user_image = userData.data.images.length
      ? userData.data.images[0].url
      : "http://dissoftec.com/DefaultUserImage.png";

    this.data.profileImage = user_image;

    this.songData.author = userData.data.display_name;
    this.songData.author_id = userData.data.id;

    this.user = {
      nickname: userData.data.display_name,
      followers: userData.data.followers.total,
      url: userData.data.href,
      type: userData.data.product,
      image: user_image,
      id: userData.data.id,
    };
  },
  playlist: {
    get: async function getAllSongs(url, items = []) {
      const songs = await Axios.get(url, spotifyApi.config);

      songs.data.items.forEach((e) => {
        items.push(e);
      });

      if (songs.data.next === null) return items;

      return getAllSongs(songs.data.next, items);
    },
    add: async (songId, playlistId) => {
      const songUri = `spotify:track:${songId}`;

      await Axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: [songUri],
        },
        spotifyApi.config
      );

      toast("🎵 Song added to your playlist!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const songs = await spotifyApi.playlist.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
      );

      const insertedId = songs.findIndex((item) => {
        return item.track.id == songId;
      });

      return { songs, insertedId };
    },
    delete: async (songId, playlistId, pos, uri) => {
      const headers = {
        Authorization: "Bearer " + token,
      };

      const data = {
        tracks: [
          {
            uri: uri.length > 0 ? uri : `spotify:track:${songId}`,
            positions: [pos],
          },
        ],
      };

      await Axios.delete(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { headers, data }
      );

      const songs = await spotifyApi.playlist.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
      );

      return songs;
    },
    create: async function () {
      let playlists = await Axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        spotifyApi.config
      );

      const reviewsicExists = () => {
        playlists = playlists.data.items;

        for (let i = 0; i < playlists.length; i++) {
          if (playlists[i].name === "Reviewsic") {
            spotifyApi.data.playlistId = playlists[i].id;
            return true;
          }
        }
        return false;
      };

      if (reviewsicExists()) {
        spotifyApi.likedSongs = await spotifyApi.playlist.get(
          `https://api.spotify.com/v1/playlists/${spotifyApi.data.playlistId}/tracks`
        );
      } else {
        const createPlaylist = await Axios.post(
          `https://api.spotify.com/v1/users/${spotifyApi.songData.author_id}/playlists`,
          {
            name: "Reviewsic",
          },
          spotifyApi.config
        );
        spotifyApi.data.playlistId = createPlaylist.data.id;
      }

      return spotifyApi.data.playlistId;
    },
  },
  song: {
    get: async (songId) => {
      try {
        return (
          await Axios.get(
            `https://api.spotify.com/v1/tracks/${songId}`,
            spotifyApi.config
          )
        ).data;
      } catch (err) {
        return false;
      }
    },
    getGenres: async function (artistId) {
      return (
        await Axios.get(
          `https://api.spotify.com/v1/artists/${artistId}`,
          spotifyApi.config
        )
      ).data.genres;
    },
  },
  player: {
    current: async () => {
      const current = await Axios.get(
        `https://api.spotify.com/v1/me/player`,
        spotifyApi.config
      );
    },
  },
};
