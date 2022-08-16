import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = (props) => {
    return (
        <>

        <div>
            <Header isAuthenticated={props.isAuthenticated} user={props.user}/>
            {props.children}
         </div>

          <Footer />
         </>
        
    )
}


export default Layout;