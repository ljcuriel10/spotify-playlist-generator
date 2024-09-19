import React from 'react';

const Search = ({term, setTerm}) => {
  
  const inputHandler = (e) => {
    setTerm(e.target.value);
  };

  const onClickHandler = e => {
    e.preventDefault();
    setTerm("");
  };
  
  return (
    <form>
        <div className='container my-5 w-50 text-center'>
            <label htmlFor='search' className='fs-5 mid-blue fw-bold'>Search</label>
            <input type='text' id='search' className='mx-2 rounded px-2' placeholder='Enter track name' onChange={inputHandler} value={term}/>
            <button className='btn btn-danger' onClick={onClickHandler} >Clear</button>
        </div>
       
    </form>
  )
};

export default Search