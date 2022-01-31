import './index.css';
import { Link } from 'react-router-dom';
function Politique() {
    return (
        <div className="boxPolitique">
            <div className="itemPolitique">
                <div>
                    <Link className="politique" to="/legals">
                        Mentions légales
                    </Link>
                </div>
                <div>
                    <Link className="politique" to="/cgu">
                        CGU
                    </Link>
                </div>
                <div>
                    <Link className="politique" to="/cookies">
                        Politique de cookies
                    </Link>
                </div>
                <div>
                    <Link className="politique" to="/rgpd">
                        Politique de protection des données
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Politique;
