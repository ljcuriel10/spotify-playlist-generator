import React from 'react'

const Header = ({username}) => {
  return (
    <div>
        <div className='dcontainer-fluid text-center py-3' id='header'>
            <a className='navbar-brand text-uppercase fw-bold fs-3' href='#'>Spotify Playlist Generator</a>
            <div>
              <p className='d-inline fs-4 text-uppercase txt-silver-lake fw-semibold'>Welcome {username}!</p>
            </div>
        </div>
    </div>
  )
}

export default Header