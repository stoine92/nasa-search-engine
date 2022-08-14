import { useState } from 'react'
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


  const handleSignUp = () => {
   const auth =  firebase.auth;

   firebase.createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  // const handleLogin = () => { 
  //   const auth = firebase.auth;

  //   firebase.signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });
  // }

  const handleLogin = () => {
    console.log(firebase);
  }


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
      /></Route>
      <Route path='/about' component={About} />
    </Switch>
    </Layout>
    
    </>
   
  );
}

export default App;
