import { useState, useEffect } from 'react'
import { Route, Routes, Navigate} from "react-router-dom";
import Layout from "./components/layout/layout";
import PrivateRoutes from './utils/PrivateRoutes'

import Login from './main/login/Login'
import SearchBar from './main/searchBar/SearchBar';
import Home from './main/home/Home';

import * as firebase from "./fire";
 
// API key = MxoEpFHG0Pqrk7aNRNZ4LpqYLoCkY3kLbMibjJHh


function App() {
    // Authenticator 
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);




  const handleSignUp = () => {
    clearError();
    clearInput();
   const auth =  firebase.auth;

   firebase.createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //   const user = userCredential.user;
    
  // })
  .catch((error) => {
    const errorCode = error.code;
    
    switch (errorCode){
      case "auth/email-already-in-use":
        setEmailError("Email is already in use");
        break;
        default: break;
    }
  });
  }

  const handleLogin = () => { 
    clearError();
    clearInput();
    
    const auth = firebase.auth;

    firebase.signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    console.log(userCredential.user.email);
    setIsAuthenticated(true);
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
   
    switch(errorCode){
      case "auth/invalid-email":
      case "auth/wrong-password":
      case "auth/user-not-found":
        setEmailError("Wrong username or password");
        break;
        default: break;
        
    }
  });
  }

  const handleAuthState = () => {
    const auth = firebase.auth;

    firebase.onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        setUser(user);
     } else{
      setUser(null);
     }
    });
  }


  const deleteUser = () => {
    
   const auth = firebase.auth;
    const user = auth.currentUser;
     firebase.deleteUser(user)
     
  }

  const clearInput = () =>{
    setEmail("");
    setPassword("")

  }
  const clearError = () => {
    setEmailError("");
  }

useEffect(() => {
  handleAuthState();
}, []);


// API requests 

    const [search, setSearch] = useState([]);
    const [nasaPhoto, setNasaPhoto] = useState([]);
    const [liElement, setLiElement] = useState([]);
    

     const URL = "https://images-api.nasa.gov/search?q=";
    
    const onSearch = (e) => {
        
        clearSearch();
        // Request 
        fetch(`${URL}${search}`)
        .then(data=> data.json())
        .then(output => {
            let collections = output.collection.items.filter((item) => item.data[0].media_type === 'image');
            setNasaPhoto(prevState =>  [...prevState ,collections]); 
            // for (let i = 0; i < 6; i++){
              
            //      
            // // }
            // console.log(nasaPhoto);
         })
         .catch(err => console.log(err));
        
 }
 
  // const testMe = () => {
  //   nasaPhoto.map(picture => {
  //     console.log(picture.href);
  //     // let key = picture.data[0].nasa_id

  //     // setLiElement(prevState=> [...prevState, <img key={key} src={picture.links[0].href} />])
  //     // console.log(picture.links[0].href);
  //   })
  // }

    const clearSearch = () => {
      setNasaPhoto("");
      setLiElement("");
    }


  return (
    <>
    <Layout 
    isAuthenticated={isAuthenticated}
    setIsAuthenticated={setIsAuthenticated}
    user={user}
    >
      
    <Routes>
       <Route path="/home-page" element={<Home />}/>

       <Route path="/login-register" element={<Login 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                hasAccount={hasAccount}
                setHasAccount={setHasAccount}
                handleSignUp={handleSignUp}
                handleLogin={handleLogin}
                handleAuthState={handleAuthState}
                emailError={emailError}
                deleteUser={deleteUser}
                isAuthenticated={isAuthenticated}
            />} />

       <Route element={<PrivateRoutes />}> 
            <Route path="/search-bar" element={<SearchBar 
                onSearch={onSearch}
                search={search}
                setSearch={setSearch}
                liElement={liElement}
                setLiElement={setLiElement}
                nasaPhoto={nasaPhoto}
                // testMe={testMe}
             />}/>

       </Route>
    </Routes> 
    </Layout>
    
    </>
   
  );
}

export default App;
