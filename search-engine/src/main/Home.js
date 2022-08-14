const Home = () => {
    return ( 
        <>
            <div>
             <h1>Nasa Search Engine</h1>
         </div>
         <form type='submit'>
            <label for="email">Email address:</label>
            <input type="email" name="email"  />
            <label for="password">Password"</label>
            <input type="password" name="password"  />
            <input type="submit" value="Submit" />
        </form> 
         </>
        
    )
}

export default Home;