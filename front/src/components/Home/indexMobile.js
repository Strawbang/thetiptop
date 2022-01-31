import './mobileIndex.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";

function Home() {
  const Tab = ({ children }) => {
    const { onClick } = useTabState();
  
    return onClick ? <button className="active" onClick={onClick}>{children}</button> : <button onClick={onClick}>{children}</button> ;
  };
  const Panel = ({ children }) => {
    const isActive = usePanelState();
    
    return isActive ? <p>{children}</p> : null;
  };
  return (
      <div className="boxMobileHome">
        <Tabs>
            <div className="boxMobileTitle">
                <div className="mobileTitle_Firt">
                  <Tab>
                    <th>Le jeu-concours</th>
                  </Tab>
                </div>
                <div className="mobileTitle_Second">
                  <Tab>
                    <th>Du 12 Octobre au 15 Novembre</th>
                  </Tab>
                </div>
            </div>
            <Panel>
              <div className="boxMobileFirst">
                  <h1 className="FirstTitle">Achetez & Gagnez</h1>
                  <p className="FirstContent">Tentez votre chance en passant en caisse avec 49€ d’achats chez nos partenaires participants ! <br/><br/>
                  Tous les tickets sont 100% gagnants. Et de multiples lots sont proposés. N’hésitez pas à consulter la liste des lots, qui devrait vous plaire.<br/><br/>
                  A la fin du jeu, un tirage au sort aura lieu pour décider du gagnant d’un an de thé d’une valeur de 360€ de notre gamme thé de luxe !<br/><br/>
                  Pour plus d’informations concernant le jeu-concours, consulter le réglement pour y participer.</p>
                  <div className="butttonAction">
                    <Link to="/rules" className="howToButton">Comment participer ?</Link>
                  </div>
              </div>
            </Panel>
            <Panel>
              <div className="boxMobileSecond">
                <h2><span className="firstGreen">1 500 000</span> Lots disponibles</h2>
                <h2><span className="firstGreen">8</span> lots différents</h2>
                <h2><span className="firstGreen">1</span> Gros lot d’un valeur de 360€</h2>
                <h2><span className="firstGreen">Tirage au sort le 16 novembre</span></h2>
                <div className="butttonAction">
                  <Link to="/participate" className="participateButton">Participer</Link>
                </div>
              </div>
            </Panel>
        </Tabs>
      </div>
  );
}

export default Home;
