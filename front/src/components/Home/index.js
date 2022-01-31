import './index.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import First from './second.jpg' ;
import Second from './first.jpg';
import Feuille from './Feuille-Finale-jauneSurblanc.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

function Home() {   
    return (
        <div className="boxHome">
            <div className="boxHomeMain">
                <div className="boxHomeCarousel">
                    <Carousel showThumbs={false} showIndicators={false} showStatus={false} autoPlay={false} interval={8000} infiniteLoop={true} stopOnHover={false}>
                        <div>
                            <div style={{ backgroundImage: `url(${First})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: 1000 + "px" }}>
                                <div className="carouselItems">
                                    <div className="carouselItemSection">
                                        <div className="carousel1Title">
                                            <h1>Le jeu-concours</h1>
                                            <h2>Achetez & Gagnez</h2>
                                            <p>Du 12 Octobre au 15 Novembre</p>
                                            <p>Tentez de gagner de nombreux lots en participant au jeu-concours organisé par <span className="thetiptop">Thé Tip Top</span></p>
                                            <p>1 an de thé de notre gamme de signature d'une valeur de 360€ à gagner !</p>
                                            <Link to="/participate">
                                                <button className="carouselButton">
                                                    Participer
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="carouselItemSection">
                                        <div className="carouselContent">
                                            <div className="carouselContentFrame">
                                                <div style={{display:'flex'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        Tickets 100% gagnants
                                                    </p>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        5 lots différents à gagner
                                                    </p>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        Avantage newsletter en exclusivité
                                                    </p>
                                                </div>
                                                <div style={{display:'flex', alignItems: 'center'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        Inscription au grand tirage au sort pour remporter 1 an de thé de notre gamme signature
                                                    </p>
                                                </div>
                                            </div>
                                            <Link to="/rules" className="carouselContentButton">
                                                <button className="ContentButton buttonHow">
                                                    Comment participer ?
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ backgroundImage: `url(${Second})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: 1000 + "px" }}>
                                <div className="carouselItems">
                                    <div className="carouselItemSection">
                                        <div className="carousel1Title">
                                            <h1>Le jeu-concours</h1>
                                            <h2>Achetez & Gagnez</h2>
                                            <p>Du 12 Octobre au 15 Novembre</p>
                                            <p>Tentez de gagner de nombreux lots en participant au jeu-concours organisé par <span className="thetiptop">Thé Tip Top</span></p>
                                            <p>1 an de thé de notre gamme de signature d'une valeur de 360€ à gagner !</p>
                                            <Link to="/participate">
                                                <button className="carouselButton">
                                                    Participer
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="carouselItemSection">
                                        <div className="carouselContent">
                                            <div className="carouselContentFrame">
                                                <div style={{display:'flex'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        Tickets 100% gagnants
                                                    </p>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        5 lots différents à gagner
                                                    </p>
                                                </div>
                                                <div style={{display:'flex'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        Avantage newsletter en exclusivité
                                                    </p>
                                                </div>
                                                <div style={{display:'flex', alignItems: 'center'}}>
                                                    <img src={Feuille} alt="Feuille" style={{width:65 +'px', height:65 + 'px'}}></img>
                                                    <p style={{marginBottom:0 + 'px'}}>
                                                        Inscription au grand tirage au sort pour remporter 1 an de thé de notre gamme signature
                                                    </p>
                                                </div>
                                            </div>
                                            <Link to="/rules" className="carouselContentButton">
                                                <button className="ContentButton buttonHow">
                                                    Comment participer ?
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Home;
