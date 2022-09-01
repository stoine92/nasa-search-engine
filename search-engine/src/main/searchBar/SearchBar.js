import './SearchBar.css'
import { useEffect, useState } from 'react';
import searchImg from '../../pictures/images.png'


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
    const [picInfo, setPicInfo] = useState([])

    const [imgElement, setimgElement] = useState([]);
    const [descElement, setDescElement] = useState([]);

    const URL = "https://images-api.nasa.gov/search?q=";
    
    const onSearch = (e) => {
        
      e.preventDefault();
      clearSearch();

        // Request 
        fetch(`${URL}${search}`)
        .then(data=> data.json())
        .then(output => {

        let collections = output.collection.items.filter((item) => item.data[0].media_type === 'image')
            for(let i = 6 ; i < 18; i+=2){
                let images = collections[i].links[0].href
                let description = collections[i].data[0].description
                

                setNasaPhoto((prevState) => [...prevState, images]); 
                setPicInfo((prevState) => [...prevState, description])
             }
         })
         .catch(err => console.log(err));
 }

    const clearSearch = () => {
      setNasaPhoto([]);
      setimgElement([]);
      setPicInfo([])
    }

  useEffect(() => {
        const imgElMap = nasaPhoto.map((ele) =>{
            return <img key={ele} src={ele} />
         })
        setimgElement(imgElMap)
    

        const description = picInfo.map((ele) =>{
            return <p>{ele}</p>
         })
        setDescElement(description)
   
    
  },[nasaPhoto])

    

    return (
        <div className='main-search'>
        <form type='submit' className="search-form">
            <input type="text" placeholder="Search..." name='search' value={search}  onChange={(e) => setSearch(e.target.value)} />
        <button type='submit' onClick={onSearch}><img src={searchImg}/></button>
        
       </form>
            {nasaPhoto.length > 0?
            <div>
             {imgElement}
             {descElement}
            </div>
            : ''}
        </div>

            
    )
}

export default SearchBar;