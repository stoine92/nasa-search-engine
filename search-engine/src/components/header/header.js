const Header = ({isAuthenticated, user}) => {

   
    return(
        <header>
            <h1> this will be my header</h1>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact us</li>
                {isAuthenticated? <p>Welcome, {user.email}</p> : <li>Login/Register</li> }
            </ul>
        </header>
        
    )
}


export default Header;