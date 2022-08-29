import { Navigate } from 'react-router-dom';
import './Login.css';
import { useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";


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
    // isAuthenticated,
    handleAuthState,
    emailError,
    deleteUser
} = props;
const { isAuthenticated } = useContext(LoginContext);



function loginFunc (e) {
    e.preventDefault();
    handleLogin()
   
}

function signUpFunc (e) {
    e.preventDefault();
    handleSignUp();
}

function authState (e){
    e.preventDefault();
    handleAuthState()
}

function deleted (e) {
    e.preventDefault();
    deleteUser();
}
    return ( <>
   
        <h1>Nasa Search Engine</h1>

        <div className='login-form'>
         
        <div className='login'>
            <div>
            <form type='submit' className='loginContainer'>
                <label htmlFor="email">Email address:</label>
                <input 
                className="input"
                type="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}  
                />
                <label htmlFor="password">Password</label>
                <input 
                className="input"
                type="password" 
                name="password" 
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}   
                />
                <div className="btnContainer">
                {!hasAccount ? (
                    <>
                    <button 
                    className="button"
                    type="submit"
                    onClick={signUpFunc}
                    >Sign Up
                    </button>
                    
                    
                    <p>Have an account ? </p>
                    <span className="switchSpan" onClick={() => setHasAccount(true)}>Login</span>
                    </>)
                    : (
                    <>  
                    <button
                    className="button"
                    type="submit"
                    onClick={loginFunc}
                    >
                    Login
                    </button>
                    <p>Don't have an account ? </p>
                    <span className="switchSpan" onClick={() => setHasAccount(false)}>Register</span>
                    {isAuthenticated ? <Navigate replace to="/search-bar" /> : ""}
                    </>
                    )
                }

                </div>
           
                
            </form> 
            </div>
           
        </div>
         
                 <button
                onClick={authState}
                >Test</button>
            
                {emailError !=="" ? <h3>{emailError}</h3> : <></>}

                <button
                onClick={deleted}
                >Delete</button>
            </div>
                
            </>
        
    )
}

export default Login;