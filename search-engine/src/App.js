import { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/layout";

import About from './main/About';
import Login from './main/login/Login'
import SearchBar from './main/searchBar/SearchBar';

import * as firebase from "./fire";



function App() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const [emailError, setEmailError] = useState('');


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
  //   .then((userCredential) => {
  //   const userLog = userCredential.user;
    
  // })
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
        setUser(Boolean(user));
     } else{
      setUser(null);
     }
    });
  }

  const signOut = () => {
    const auth = firebase.auth;
    auth.signOut(); 
    
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
    <Layout>
    <Switch>
      <Route path="/" exact>
        <Login 
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
          isAuthenticated={Boolean(user)}
      /></Route>
      <Route path='/about'><About /></Route>
      <Route path="/search" component={SearchBar}/>
    </Switch>
    </Layout>
    
    </>
   
  );
}

export default App;
