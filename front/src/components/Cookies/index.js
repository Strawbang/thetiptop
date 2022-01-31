import CookieConsent from "react-cookie-consent";
import { Link } from 'react-router-dom';
import './index.css';

function Cookies() {
    return(
    <CookieConsent
        location="bottom"
        declineButtonText="Je refuse"
        buttonText="J'accepte"
        cookieName="myAwesomeCookieName2"
        buttonStyle={{ color: "#fff", background: 'rgb(50, 97, 72)' }}
        expires={150}
        enableDeclineButton
        onDecline={() => {window.location.replace("http://www.google.com");}}
        flipButtons
        >
            
        Nous utilisons des cookies pour nous permettre de mieux comprendre comment le site est utilisé. En continuant à utiliser ce site, vous acceptez cette politique.  
        <Link to="/rgpd">
            En savoir plus
        </Link>
    </CookieConsent>

    );
}
export default Cookies;