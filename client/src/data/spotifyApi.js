import Axios from 'axios'
import { toast } from "react-toastify"

export const spotifyApi = {
  config: {},
  token: '',
  authorId: '',
  data: {
    profileImage: '',
    playlistId: '',
  },
  songData: {
    author_id: '',
    author: '',
  },
  likedSongs: [],
  user: {},
  setConfig: (token) => {
    spotifyApi.config = {
      headers: {
        Authorization: "Bearer " + token,
      }
    }
  },
  get: async function(){

    const userData = await Axios.get(
      "https://api.spotify.com/v1/me", (this.config)
    )

    const user_image = userData.data.images.length
      ? userData.data.images[0].url
      : "http://dissoftec.com/NicePng_user-png_730154.jpeg"

    this.data.profileImage = user_image

    this.songData.author = userData.data.display_name
    this.songData.author_id = userData.data.id

    this.user = {
      nickname: userData.data.display_name,
      followers: userData.data.followers.total,
      url: userData.data.href,
      type: userData.data.product,
      image: user_image,
      id: userData.data.id,
    }

  },
  playlist: {
    get: async function getAllSongs(url, items = []) {
      const songs = await Axios.get(url, spotifyApi.config)

      songs.data.items.forEach((e) => {
        items.push(e)
      })

      if (songs.data.next === null) return items

      return getAllSongs(songs.data.next, items)
    },
    add: async (songId) => {
      const songUri = `spotify:track:${songId}`

      const addSong = await Axios.post(
        `https://api.spotify.com/v1/playlists/${spotifyApi.data.playlistId}/tracks`,
        {
          uris: [songUri],
        },
        spotifyApi.config
      )

      toast("🎵 Song added to your playlist!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    }, 
    delete: async (songId, uri, pos, token) => {

      const headers = {
        Authorization: "Bearer " + token,
      };

      const data = {
        tracks: [
          {
            uri: uri.length > 0 ? uri : `spotify:track:${songId}`,
            //uri: songUri,
            positions: [0],
          },
        ],
      };

      const songs = await spotifyApi.playlist.get(
        `https://api.spotify.com/v1/playlists/${spotifyApi.data.playlistId}/tracks`,
        []
      )

      let i = 0;
      songs.forEach((e) => {
        i++;
        if (e.track.id == songId) {
          data.tracks[0].positions[0] = i - 1;
          return;
        }
      })

      const removeSong = await Axios.delete(
        `https://api.spotify.com/v1/playlists/${spotifyApi.data.playlistId}/tracks`,
        { headers, data }
      );

      return 0;

      // const removeSong = await Axios.delete(
      //   `https://api.spotify.com/v1/playlists/${spotifyApi.data.playlistId}/tracks`,
      //   { headers, data }
      // )

    },
    create: async function(){
      let playlists = await Axios.get(
        `https://api.spotify.com/v1/me/playlists`,
        (spotifyApi.config)
      )
  
      const reviewsicExists = () => {
        playlists = playlists.data.items
  
        for (let i = 0; i < playlists.length; i++) {
          if (playlists[i].name === "Reviewsic") {
            spotifyApi.data.playlistId = playlists[i].id
            return true
          }
        }
        return false
      }
  
      if (reviewsicExists()) {
        spotifyApi.likedSongs = await spotifyApi.playlist.get(`https://api.spotify.com/v1/playlists/${spotifyApi.data.playlistId}/tracks`)
      } else {
        const createPlaylist = await Axios.post(
          `https://api.spotify.com/v1/users/${this.data.author_id}/playlists`,
          {
            name: "Reviewsic",
          },
          (this.config)
        )
        spotifyApi.data.playlistId = createPlaylist.data.id
      }


      return spotifyApi.data.playlistId
  
    }
  },
  song: {
    get: async (songId) => {
      try {
        return (await Axios.get(
          `https://api.spotify.com/v1/tracks/${songId}`,
          spotifyApi.config
        )).data;

      } catch (err) {
        return false
      }
    },
    getGenres: async function(artistId){
      return ((await Axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        spotifyApi.config
      )).data.genres)
    }
  },
}