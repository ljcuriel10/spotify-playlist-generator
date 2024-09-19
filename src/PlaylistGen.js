import React from 'react'
import Container from './Container'
import Button from './Button'
import Card from './Card'

const PlaylistGen = ({ playlist, onDelete, onCreate, playlistName, setPlaylistName}) => {
  const onChangeHandler = (e) => {
    setPlaylistName(e.target.value)
  }

  return (
    <Container> 
        <h3 className='bg-oxford-blue txt-platinum text-center w-100 shadow py-2'>Playlist Generator</h3>
        <form>
            <div className='text-center my-4'>
            <label htmlFor='playlistName' className='fs-4 me-3 fw-bolder txt-oxford-blue'>Playlist Name:</label>
            <input type='text' className='rounded p-2 shadow bg-platinum' placeholder='Name your playlist' id='playlistName' value={playlistName} onChange={onChangeHandler} required />
            </div>
            <div className='text-center'>
            <Button onCreate={onCreate} text='Create Playlist' color='txt-platinum' backgroundColor='bg-mid-blue' />
            </div>
        </form>
        <div className='d-flex justify-content-center mt-5'>
        {
          !playlist.length ? <p>No Tracks Selected</p> : 
          <ul  className='list-group m-2 rounded shadow w-75'>
            {
            playlist.map(track => <li className='d-flex list-group-item bg-platinum shadow rounded mb-2'>
                                      <Card name={track.name} artist={track.artist} imgUrl={track.imgUrl} id={track.id} onDelete={onDelete} onCreate={onCreate} />
                                  </li>)
            }
          </ul>
        }
        </div>
    </Container>
  )
}

export default PlaylistGen