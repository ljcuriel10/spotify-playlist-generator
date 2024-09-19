import React from 'react'
import Container from './Container'
import Card from './Card'

const SearchResults = ({tracks, onAdd, isPlaylist, setIsPlaylist}) => {
    

  return (
  
        <Container> 
            <h3 className='bg-oxford-blue txt-platinum text-center w-100 shadow py-2'>Search Results</h3>
            <div className='d-flex justify-content-center'>
                {!tracks ? <p className='text-center txt-platinum fs-1 my-5'> No Results</p> : 
                <ul  className='list-group m-2 rounded shadow w-75'>
                    {
                        tracks.map(track => <li className='d-flex list-group-item bg-platinum shadow rounded mb-2' key={track.id}> 
                                                <Card 
                                                    setIsPlaylist={setIsPlaylist} 
                                                    isPlaylist={isPlaylist} 
                                                    onAdd={onAdd} 
                                                    name={track.name} 
                                                    artist={track.artists[0].name} 
                                                    imgUrl={track.album.images[0].url} 
                                                    id={track.id} 
                                                    uri = {track.uri}
                                                /> 
                                            </li>)
                    }
                </ul>
                }               
            </div>
        </Container>
  )
}

export default SearchResults