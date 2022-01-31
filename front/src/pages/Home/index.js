import Frame from '../../components/Frame';
import Home from '../../components/Home';
import MobileHome from '../../components/Home/indexMobile';
import MediaQuery from 'react-responsive';
// import Fond from './fondHome.png' 

function App() {
    return (
      <div style={{height:100 + "%"}}>
        <MediaQuery minWidth={1224}>
          <Frame content={<Home></Home>}></Frame>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
          <Frame content={<MobileHome></MobileHome>}></Frame>
        </MediaQuery>
      </div>
    );
}

export default App;
