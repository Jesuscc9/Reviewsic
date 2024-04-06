import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import openSocket from 'socket.io-client'
import { SpotifyApiContext } from 'react-spotify-api'

import { api } from '../data/api'
import { spotifyApi } from '../data/spotifyApi'
import userActions from '../redux/user/actions'
import dataActions from '../redux/data/actions'

import Home from '../pages/Home'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import UserPage from '../pages/User'

import { DEVELOPMENT } from '../data/utils'

const Main = ({ token }) => {
  const API_ENDPOINT = DEVELOPMENT ? 'http://localhost:3001' : ''
  const socket = openSocket(API_ENDPOINT)
  api.endpoint = API_ENDPOINT

  const [users, setUsers] = useState([])
  const [loaded, setLoaded] = useState(false)

  const dispatch = useDispatch()

  const init = async () => {
    dispatch(dataActions.setReviews(await api.get()))

    dispatch(dataActions.setQualifications(await api.getQualifications()))
    dispatch(dataActions.setLikes(await api.getLikes()))

    dispatch(userActions.setToken(token))

    await spotifyApi.get()

    const playlistId = await spotifyApi.playlist.create()

    dispatch(userActions.setUser(spotifyApi.user))
    dispatch(userActions.setPlaylistId(playlistId))

    await api.newUserConnection(spotifyApi.user)

    const savedSongs = await spotifyApi.playlist.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    )

    dispatch(userActions.setSavedSongs([...savedSongs]))

    socket.emit('new user', spotifyApi.user)

    socket.on('users', (data) => {
      setUsers([...data])
    })

    socket.on('updateLikes', (data) => {
      dispatch(dataActions.setLikes(data))
    })

    socket.on('updateQualifications', (data) => {
      dispatch(dataActions.setQualifications([...data]))
    })

    socket.on('newReview', (data) => {
      dispatch(dataActions.addReview(data))
    })

    socket.on('updateReview', ({ data, id }) => {
      dispatch(dataActions.updateReview({ data, id }))
    })

    socket.on('deleteReview', (id) => {
      dispatch(dataActions.deleteReview({ id }))
    })

    setLoaded(true)
  }

  useEffect(() => {
    if (token) {
      init()
    }
  }, [token])

  return (
    <BrowserRouter>
      <SpotifyApiContext.Provider value={token}>
        <Route exact path={['/home', '/home/:id']}>
          {token && (
            <Register
              users={users}
              token={token}
              loaded={loaded}
              endpoint={API_ENDPOINT}
            />
          )}
          <Home />
        </Route>
        <Route exact path={['/user/:id', '/user/:id/:reviewId']}>
          {token ? (
            <UserPage token={token} loaded={loaded} endpoint={API_ENDPOINT} />
          ) : null}
        </Route>
        <Route exact path='/' component={Home} />
        <Route component={NotFound} />
      </SpotifyApiContext.Provider>
    </BrowserRouter>
  )
}

export default Main
