import './index.css';
import { Link } from 'react-router-dom';
function Rules() {
    return (
        <div className="boxRules">
            <div className="itemRules">
                <div className="rules">
                    <Link className="rulesTitle" to="/rules">Règlement</Link>
                </div>
                <div className="rules">
                    <Link className="rulesTitle" to="/prizes">Liste des lots</Link>
                </div>
                <div className="rules">
                    <Link className="rulesTitle" to="/FAQ">FAQ</Link>
                </div>
            </div>
        </div>
    );
}

export default Rules;
