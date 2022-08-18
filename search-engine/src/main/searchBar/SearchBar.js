import './SearchBar.css'
import { useState, useEffect } from 'react';


const SearchBar = () => {

    const [search, setSearch] = useState('');
    const [nasaPhoto, setNasaPhoto] = useState([]);
    const [isRequested, setIsRequested] = useState(null); 

   
   
    const onSearch = (test) => {
        console.log('search', test);
    }
    
    // API Request 
    //   const URL = "https://images-api.nasa.gov/search?q=";
          
    
      // useEffect(() => {
      //   function fetchData (){
      //     fetch(URL)
      //   }
    
    
      // },[]);
    

      
   
    return (
        <div className='main-search'>
        <form type='submit'>
            <input type="text" placeholder="Search..." name='search' value={search}  onChange={(e) => setSearch(e.target.value)} />
            
        </form>
        <button onClick={() => onSearch(search)}>Search</button>
        </div>
    )
}

export default SearchBar;