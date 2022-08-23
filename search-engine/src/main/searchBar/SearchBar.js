import './SearchBar.css'
// import { useState } from 'react';


const SearchBar = ({
    search,
    setSearch,
    onSearch,
    liElement,
    setLiElement,
    nasaPhoto,
    // testMe
}) => {

    function test (e){
        e.preventDefault();
        onSearch();
        
    }

 
   
    return (
        <div className='main-search'>
        <form type='submit'>
            <input type="text" placeholder="Search..." name='search' value={search}  onChange={(e) => setSearch(e.target.value)} />
        <button type='submit' onClick={test}>Search</button>
       
            
        </form>

       {/* {nasaPhoto.map(photo => {
        <p>{photo.href}</p>
       })} */}

        </div>
    )
}

export default SearchBar;