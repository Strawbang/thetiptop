import ReactGA from 'react-ga';


function GoogleAnalytics() {
    ReactGA.initialize('G-RXQJQ0JWZF');
    return(
        ReactGA.pageview(window.location.pathname + window.location.search)
    );
}

export default GoogleAnalytics;