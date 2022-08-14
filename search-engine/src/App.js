import { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout/layout";

import About from './main/About';
import Login from './main/login/Login'

import { initializeApp } from "firebase/app";
import * as firebase from "./fire";



function App() {

    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [hasAccount, setHasAccount] = useState(false);
    const [emailError, setEmailError] = useState('')


  const handleSignUp = (e) => {
    e.preventDefault();
    clearInput();
   const auth =  firebase.auth;

   firebase.createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    switch (errorCode){
      case "auth/email-already-in-use":
        setEmailError("Email is already in use")
        break;
    }
  });
  }

  const handleLogin = (e) => { 
    e.preventDefault();
    clearInput();
    const auth = firebase.auth;

    firebase.signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  const handleAuthState = () => {
    const auth = firebase.auth;

    firebase.onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        
     } 
    });
  }

  const signOut = () => {
    const auth = firebase.auth;
    auth.signOut(); 
}

  const clearInput = () =>{
    setEmail("");
    setPassword("")

  }

useEffect(() => {
  handleAuthState();
}, []);

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
      /></Route>
      <Route path='/about'><About /></Route>
    </Switch>
    </Layout>
    
    </>
   
  );
}

export default App;
