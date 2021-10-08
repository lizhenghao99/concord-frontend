import Navbar from '../navs/Navbar';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <>
            <Navbar/>
            {props.children}
            <Footer/>
        </>
    );
};

export default Layout;

