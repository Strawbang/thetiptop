import Information from '../Information'
import Menu from '../Menu'
import Networks from '../Networks'
import Politique from '../Politique'

import './index.css';
function Footer() {
    return (
        <footer>
            <div className="boxFooter">
                <div className="footerInformation">
                    <Information></Information>
                </div>
                    <hr className="mobileSeparation"/>
                <div className="footerMenu">
                    <Menu></Menu>
                </div>
                    <hr className="mobileSeparation"/>
                <div className="footerNetworks">
                    <Networks></Networks>
                </div>
                    <hr className="mobileSeparation"/>
                <div className="footerPolitique">
                    <Politique></Politique>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
