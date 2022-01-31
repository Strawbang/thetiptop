import Frame from '../../components/Frame';
import FAQ from '../../components/FAQ';
import Fond from './fondFAQ.png' 
function App() {
    return (
      <div style={{height: 100 + "%"}}>
        <Frame image={Fond} content={<FAQ></FAQ>}></Frame>
      </div>
    );
}

export default App;
