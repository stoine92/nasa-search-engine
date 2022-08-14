import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = (props) => {

    return (
        <>

        <div>
            <Header />
            {props.children}
         </div>

          <Footer />
         </>
        
    )
}


export default Layout;