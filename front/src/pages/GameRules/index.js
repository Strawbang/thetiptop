import Frame from '../../components/Frame';
import GameRules from '../../components/GameRules';
import MobileHome from '../../components/Home/indexMobile';
import MediaQuery from 'react-responsive';
import Fond from './fondRules.png' 
function App() {
    return (
      <div style={{height: 100 + "%"}}>
        <Frame image={Fond} content={<GameRules></GameRules>}></Frame>
      </div>
    );
}

export default App;
