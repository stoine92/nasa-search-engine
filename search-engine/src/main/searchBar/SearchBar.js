import './SearchBar.css'
import { useState, useEffect } from 'react';


const SearchBar = () => {

    const [search, setSearch] = useState('');
    const [nasaPhoto, setNasaPhoto] = useState([]);
    const [isRequested, setIsRequested] = useState(null); 

    const [liElement, setLiElement] = useState('');
    

     const URL = "https://images-api.nasa.gov/search?q=";
   
    const onSearch = (e) => {
        fetch(`${URL}${search}`)
        .then(data=> data.json())
        .then(output => {
            let collections = output.collection.items.filter((item) => item.data[0].media_type === 'image');
            for (let i = 0; i < 10; i++){
                setNasaPhoto(collections[i].links[0].href);
                console.log(nasaPhoto);
            }
            

        } );
    }
    

   
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