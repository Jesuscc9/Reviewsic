import React, { useEffect, useRef, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import {
  Contacts as ContactsContainer,
  ActivityCard,
  Item
} from './styles/Contacts.style'

const Contacts = ({ data }) => {
  const gifs = [
    'https://cdn.betterttv.net/emote/5ffa90b557784508462544e7/2x',
    'https://cdn.betterttv.net/emote/602e1e25ee839b1e5ec6e00b/2x',
    'https://cdn.betterttv.net/emote/60b11c96f8b3f62601c34a70/2x',
    'https://cdn.betterttv.net/emote/5f25a22265fe924464ef0799/2x',
    'https://cdn.betterttv.net/emote/60ac1dc867644f1d67e8c5f3/2x',
    'https://cdn.betterttv.net/emote/5ea5b6cbd023b362f639427d/2x',
    'https://cdn.betterttv.net/emote/55898e122612142e6aaa935b/2x'
  ]

  return (
    <React.Fragment>
      <ContactsContainer>
        <div className='contact-header'>
          <h1 className='contact-title'>Online</h1>
        </div>
        <div className='contact-body'>
          {data.map((user) => {
            return (
              <React.Fragment key={user.userId}>
                <div className='divisor'></div>

                <Item
                  key={user.id}
                  initial={{
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1
                  }}
                  transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                  exit={{
                    opacity: 0
                  }}
                >
                  <div className='item-image-container'>
                    <img className='profile-image' src={user.image} alt='' />
                  </div>
                  <div className='item-info'>
                    <a
                      className='item-name'
                      href={`https://open.spotify.com/user/${user.userId}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {user.user}
                    </a>

                    <div className='item-info-status'>
                      <p>
                        {user.followers} follower{user.followers > 1 && 's'}
                      </p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {user.activity?.isPlaying ? (
                      <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{
                          x: 30,
                          opacity: 0
                        }}
                        key='gif'
                        transition={{ type: 'spring', duration: 0.4 }}
                        className='item-status'
                      >
                        <img src={gifs[user.activity.gifIndex]} />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0
                        }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: 'spring', duration: 0.4 }}
                        key='status'
                        className='item-status'
                      >
                        <div className='status'></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {user.activity?.isPlaying && (
                    <ActivityCard className='activity-card'>
                      <div className='activity-container'>
                        <p>Listening to: </p>
                        <div className='activity-content'>
                          <img src={user.activity.image} alt='' />
                          <div className='song-data'>
                            <a
                              href={`https://open.spotify.com/track/${user.activity.id}`}
                              target='_blank'
                              rel='noreferrer'
                            >
                              <p>{user.activity.name}</p>
                            </a>
                            <p className='artist-name'>
                              {user.activity.artists}
                            </p>
                          </div>
                        </div>
                      </div>
                    </ActivityCard>
                  )}
                </Item>
              </React.Fragment>
            )
          })}
          <div className='divisor extra-divisor'></div>
        </div>
      </ContactsContainer>
    </React.Fragment>
  )
}

export default Contacts
