import HeadComponent from '../components/contents/HeadComponent';
import { AuthContextProvider } from '../contexts/AuthContext';
import { UserContextProvider } from '../contexts/UserContext';
import { Chakra } from '../lib/chakra';
import '../styles/styles.css';
import theme from '../themes/theme';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Chakra theme={theme} cookies={pageProps.cookies}>
            <AuthContextProvider>
                <UserContextProvider>
                    <HeadComponent/>
                    <Component {...pageProps} />
                </UserContextProvider>
            </AuthContextProvider>
        </Chakra>
    );
};

export default MyApp;

export { getServerSideProps } from '/lib/chakra';