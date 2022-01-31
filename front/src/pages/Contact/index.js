import Frame from '../../components/Frame';
import Contact from '../../components/Contact';
import Fond from './fondContact.png' 
function App() {
    return (
      <div style={{height: 100 + "%"}}>
        <Frame image={Fond} content={<Contact></Contact>}></Frame>
      </div>
    );
}

export default App;
