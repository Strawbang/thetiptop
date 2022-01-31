import './index.css';
import { SocialIcon } from 'react-social-icons';

function Networks() {
    return (
        <div className="boxNetworks">
            <div className="itemNetworks">
                <div className="networks">
                    <p>
                        Suivez-nous !
                    </p>
                </div>
                <div className="networks">
                    <SocialIcon bgColor="#326148" fgColor="#fff" url="https://facebook.com/" target="_blank" />
                    <SocialIcon bgColor="#326148" fgColor="#fff" url="https://instagram.com/" target="_blank"  />
                </div>
            </div>
        </div>
    );
}

export default Networks;
