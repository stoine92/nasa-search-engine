const Login = (props) => {
const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    // emailError,
    // passwordError,
    // isAuthenticated
    handleAuthState,
    signOut,
    emailError,
    deleteUser
} = props;


function authState (e){
    e.preventDefault();
    handleAuthState()
}

function logOut (e){
    e.preventDefault();
    signOut();
}

function deleted (e) {
    e.preventDefault();
    deleteUser();
}
    return ( 
        <>
            <div>
             <h1>Nasa Search Engine</h1>
            </div>
         
         <form type='submit'>
            <label htmlFor="email">Email address:</label>
            <input 
            type="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}  
            />
            <label htmlFor="password">Password</label>
            <input 
            type="password" 
            name="password" 
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}   
            />
           

            {
                !hasAccount ? 
                <>
                <button 
                type="submit"
                onClick={handleSignUp}
                >Sign Up
                </button>
                
                
                <p>Have an account ? </p>
                <span onClick={() => setHasAccount(true)}>Login</span>
                </>
                :
                <>  
                 <button
                  type="submit"
                  onClick={handleLogin}
                  >
                  Login
                  </button>
                <p>Don't have an account ? </p>
                <span onClick={() => setHasAccount(false)}>Register</span>
                </>
               
            }
        </form> 
                 <button
                onClick={authState}
                >Test</button>
             <button 
                onClick={logOut}
                >Logout</button>
                {emailError !="" ? <h3>{emailError}</h3> : <></>}

                <button
                onClick={deleted}
                >Delete</button>
         </>
        
    )
}

export default Login;