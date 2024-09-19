import React from 'react'

const Card = ({name, artist, imgUrl, onAdd, id, isPlaylist, setIsPlaylist, onDelete, uri}) => {
    const addTrack = () => {
        onAdd(artist, name, imgUrl, id, uri);
        setIsPlaylist(false)
    }

    const removeTrack = () => {
        onDelete(id)
    }

  return (
    <div className='card border-none '>
        <div className='row g-0'>
            <div className='col-md-4'>
            <img src={imgUrl} className='img-fluid rounded-start'/>
            </div>
            <div className='col-md-8 bg-platinum '>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>{artist}</p>
                    <div className='btn-group'>
                        {!isPlaylist ? <button onClick={removeTrack} className='btn btn-danger'>- remove</button> : <button onClick={addTrack} className='btn btn-success'>+ Add</button>}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card