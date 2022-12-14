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
            for(let i = 0 ; i < 9; i += 1){
                let images = collections[i].links[0].href
                let description = collections[i].data[0].title
                // console.log(collections[i].data[0].title);
                
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

    const description = picInfo.map((ele) =>{
        return <p>{ele}</p>
     })
    setDescElement(description)

        const imgElMap = nasaPhoto.map((ele) =>{
            return (
                <>
                <img className="img-style" key={ele} src={ele} />
                {descElement}
                </>
            )
         })
        setimgElement(imgElMap)
    

        
    
  },[nasaPhoto])

    

    return (
        <div className='test-div'>
        <div className='main-search'>
        <form type='submit' className="search-form">
            <input type="text" placeholder="Search..." name='search' value={search}  onChange={(e) => setSearch(e.target.value)} />
        <button type='submit' onClick={onSearch}><img src={searchImg}/></button>
        
       </form>
            
        </div>
    
        {nasaPhoto.length > 0?
            
            <div className="container">
                {imgElement}
                {/* {descElement} */}
             </div>
          : ''}
             
        </div>
        
            
    )
}

export default SearchBar;