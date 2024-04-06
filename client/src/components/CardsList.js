import React from 'react'
import { CardsContainer } from './styles/CardsList.style'
import { useSelector } from 'react-redux'
import Card from './Card'
import { useParams } from 'react-router'

const CardsList = (props) => {
  const params = useParams()
  const page = 'user'

  console.log({ props })

  const savedSongs = useSelector((state) => state.user.savedSongs)

  var cards = props.songList

  if (params.id) {
    cards = cards.filter((e) => e.id != params.id)
  }

  if (props.search.length) {
    cards = cards.filter((el) => {
      return (
        el.song?.toLowerCase().includes(props.search.toLowerCase()) ||
        el.artist?.toLowerCase().includes(props.search.toLowerCase()) ||
        el.user?.toLowerCase().includes(props.search.toLowerCase())
      )
    })
  }

  if (props.filters.length) {
    cards = cards.filter((el) => {
      for (let i = 0; i < props.filters.length; i++) {
        if (el.genre == props.filters[i]) {
          return true
        } else {
          return false
        }
      }
    })
  }

  const sortType = props.sortType

  if (sortType === 'song') {
    cards = [...cards].sort((a, b) =>
      a[sortType].localeCompare(b[sortType], 'en', { sensitivity: 'base' })
    )
  } else {
    cards = [...cards].sort((a, b) => b[sortType] - a[sortType])
  }

  cards = cards.slice(0, props.limit)

  cards = cards.map((item) => {
    item.isInPlaylist = savedSongs.findIndex((song) => {
      return song.track.id == item.id
    })
    if (item.isInPlaylist > -1) {
      item.uri = savedSongs[item.isInPlaylist].track.uri > -1
    }

    var cant = 0

    const rating =
      (props.qualifications.reduce((acc, x) => {
        if (x.reviewId == item.id) {
          cant++
          return acc + x.qualification
        }
        return acc
      }, 0) +
        item.qualification) /
      (cant + 1)

    item.rating = rating

    item.likes = props.likes.reduce((acc, x) => {
      return x.reviewId == item.id && x.isLike ? acc + 1 : acc
    }, 0)

    return item
  })

  return (
    <CardsContainer>
      {cards.map((item) => {
        return <Card data={item} {...props} page={page} />
      })}
    </CardsContainer>
  )
}

export default CardsList
