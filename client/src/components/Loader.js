import React from 'react'
import '../components/styles/Loader.css'

const Loader = () => {
  return (
    <React.Fragment>
      <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </React.Fragment>
  )
}

export default Loader
