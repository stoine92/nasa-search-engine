import './SearchBar.css'
// import { useState } from 'react';


const SearchBar = ({
    search,
    setSearch,
    onSearch,
    liElement,
    setLiElement,
    nasaPhoto
}) => {

   
    return (
        <div className='main-search'>
        <form type='submit'>
            <input type="text" placeholder="Search..." name='search' value={search}  onChange={(e) => setSearch(e.target.value)} />
            
        </form>
        <button onClick={() => onSearch(search)}>Search</button>

        {liElement}

        </div>
    )
}

export default SearchBar;