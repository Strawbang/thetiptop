import Frame from '../../components/Frame';
import PrizesList from '../../components/PrizesList';
import Fond from './fondPrizes.png' 
function App() {
    return (
      <div style={{height: 100 + "%"}}>
        <Frame image={Fond} content={<PrizesList></PrizesList>}></Frame>
      </div>
    );
}

export default App;
