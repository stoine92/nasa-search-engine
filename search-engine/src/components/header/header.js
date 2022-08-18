import { NavLink } from "react-router-dom";
import * as firebase from "../../fire";
import './Header.css';

const Header = ({isAuthenticated, setIsAuthenticated, user}) => {


    const signOut = () => {
        const auth = firebase.auth;
        auth.signOut(); 
        setIsAuthenticated(false);
    }
   
    return(
        <header>
            {isAuthenticated ? <h1 className='header-h1'> Welcome, {user.email}</h1> : <h1 className='header-h1'>Welcome, Guest</h1>}
            <nav>
                <ul >
                    <NavLink className="header-list" to="/home-page" ><li className="header-list-li">Home</li></NavLink>
                    <NavLink className="header-list" to="/about"><li className="header-list-li">About</li></NavLink>
                    <NavLink className="header-list" to="contact-us"><li className="header-list-li">Contact us</li></NavLink>
                  </ul>
            </nav>
           
            {isAuthenticated? <> <NavLink className="header-list" to="/home-page" onClick={signOut}><span className="login-logout">Logout</span></NavLink> </> 
                    : <p><NavLink className="header-list" to="/login-register"><span className="login-logout">Login/Register</span></NavLink></p> }
        </header>
        
    )
}


export default Header;