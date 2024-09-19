import React from 'react'

const Container = ({children}) => {
  return (
    
    <div  className='col mx-4 border border-black shadow-lg rounded bg-silver-lake p-0' style={{minHeight: '50rem'}}>
       {children}
    </div>
  )
}

export default Container