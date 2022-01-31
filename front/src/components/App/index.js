import NavBar from '../Navbar';
import Cookies from '../Cookies';
import Footer from '../Footer';
import Routing from '../Routing';
import MediaQuery from 'react-responsive';

function App() {
  return (
    <div className="App" style={{display: "flex", flexDirection: "column", minHeight: 100 + "vh", backgroundColor: "rgba(255,255,255,0.3)",}}>
      <header style={{width: 100 + "%",position: "relative", height: 25 + "%"}}>
        <NavBar></NavBar>
        <Cookies></Cookies>
      </header>
      <MediaQuery minWidth={599}>
        <div style={{flexGrow: 1}}>
          <Routing></Routing>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={601}>
        <div>
          <Routing></Routing>
        </div>
      </MediaQuery>
      <footer style={{width: 100 + "%",position: "relative", height: 25 + "%", bottom: 0}}>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export default App;
