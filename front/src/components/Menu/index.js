import './index.css';
import { Link } from 'react-router-dom';
function Menu() {
    return (
        <div className="boxMenu">
            <div className="itemMenu">
                <div>
                    <Link className="menu" to="/rules">
                        Règlement
                    </Link>
                </div>
                <div>
                    <Link className="menu" to="/prizes">
                        Liste des lots
                    </Link>
                </div>
                <div>
                    <Link className="menu" to="/FAQ">
                        FAQ
                    </Link>
                </div>
                <div>
                    <Link className="menu" to="/contact">
                        Nous contacter
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;