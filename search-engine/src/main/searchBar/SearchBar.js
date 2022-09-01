import './SearchBar.css'
import { useEffect, useState } from 'react';


const SearchBar = ({
    // search,
    // setSearch,
    // onSearch,
    // liElement,
    // setLiElement,
    // nasaPhoto,
    
    
}) => {

    const [search, setSearch] = useState([]);
    const [nasaPhoto, setNasaPhoto] = useState([]);
    const [liElement, setLiElement] = useState([]);
    

     const URL = "https://images-api.nasa.gov/search?q=";
    
    const onSearch = (e) => {
        
      e.preventDefault();
      clearSearch();

        // Request 
        fetch(`${URL}${search}`)
        .then(data=> data.json())
        .then(output => {

        let collections = output.collection.items.filter((item) => item.data[0].media_type === 'image')
            
           for(let i = 0 ; i < 6; i++){
                let images = collections[i].links[0].href
                setNasaPhoto((prevState) => [...prevState, images]); 
             }
            

         })
         .catch(err => console.log(err));
 }



    const clearSearch = () => {
      setNasaPhoto([ ]);
      setLiElement([]);

    }

  useEffect(() => {
    const liElMap = nasaPhoto.map((ele) =>{
        return <img src={ele} />

    })
    setLiElement(liElMap)
  },[nasaPhoto])

    

    return (
        <div className='main-search'>
        <form type='submit'>
            <input type="text" placeholder="Search..." name='search' value={search}  onChange={(e) => setSearch(e.target.value)} />
        <button type='submit' onClick={onSearch}>Search</button>
        
       </form>
            {nasaPhoto.length > 0?
            <>
             {liElement}
            </>
            : ''}
        </div>

            
    )
}

export default SearchBar;