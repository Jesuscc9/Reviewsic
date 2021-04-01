import Axios from 'axios'

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
  playlist: async function(){
    let playlists = await Axios.get(
      `https://api.spotify.com/v1/me/playlists`,
      (this.config)
    )

    const reviewsicExists = () => {
      playlists = playlists.data.items

      for (let i = 0; i < playlists.length; i++) {
        if (playlists[i].name === "Reviewsic") {
          this.data.playlistId = playlists[i].id
          return true
        }
      }
      return false
    }

    if (reviewsicExists()) {
      this.likedSongs = await getAllSongs(
        `https://api.spotify.com/v1/playlists/${this.data.playlistId}/tracks`,
        []
      )
    } else {
      const createPlaylist = await Axios.post(
        `https://api.spotify.com/v1/users/${this.data.author_id}/playlists`,
        {
          name: "Reviewsic",
        },
        (this.config)
      )
      this.data.playlistId = createPlaylist.data.id
    }

    async function getAllSongs(url, items) {
      const songs = await Axios.get(url, (spotifyApi.config))

      songs.data.items.forEach((e) => {
        items.push(e)
      })

      if (songs.data.next === null) return items

      return getAllSongs(songs.data.next, items)
    }

  }
}