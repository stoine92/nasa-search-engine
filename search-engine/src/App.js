import { useState, useEffect } from 'react'
import { Route, Routes} from "react-router-dom";
import Layout from "./components/layout/layout";

import Login from './main/login/Login'
import SearchBar from './main/searchBar/SearchBar';

import * as firebase from "./fire";



function App() {
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

  const signOut = () => {
    const auth = firebase.auth;
    auth.signOut(); 
    setIsAuthenticated(false);
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
}, [handleAuthState]);

  return (
    <>
    <Layout 
    isAuthenticated={isAuthenticated}
    user={user}
    >
    <Routes>
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
          signOut={signOut}
          emailError={emailError}
          deleteUser={deleteUser}
          isAuthenticated={isAuthenticated}
      />} />
     
       <Route path="/search" element={<SearchBar />}/>
    </Routes> 
    </Layout>
    
    </>
   
  );
}

export default App;
