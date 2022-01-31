import { useState} from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Signin from "../../components/Signin";
import Signup from "../../components/Signup";
import TicketCheck from "../../components/TicketCheck";
import Wheel from "../../components/Wheel";
import Cookies from 'js-cookie'
import './index.css';


function Participate(props){
    const [show, setShow] = useState(1);
    const [ticket, setTicket] = useState('');
    const [prize, setPrize] = useState('');
    const { user: auth } = useSelector((state) => state.auth);
    const cookies = Cookies.get();

    const toggleHigh = (e) => {
        if (e.target.classList.contains('o-signup')) {
            e.target.closest('.auth').classList.add('signup');
            e.target.closest('.auth').classList.remove('signin');
        }
        else if (e.target.classList.contains('o-signin')) {
            e.target.closest('.auth').classList.add('signin');
            e.target.closest('.auth').classList.remove('signup');
        }
    }
    if (show === 1 ){
        return(
            <TicketCheck data={{setShow, setTicket, setPrize}}/>
        );
    }
    else if (show === 2){
        return(
            <div className='auth signup'>
                <div className='auth-switch'>
                    <div className='o-signup high' onClick={ (e) => toggleHigh(e) }>
                        Inscription
                    </div>
                    <div className='o-signin' onClick={ (e) => toggleHigh(e) }>
                        Connexion
                    </div>
                </div>
                <div className='auth-options'>
                    <Signup data={{setShow}} ticket={ticket}/>
                    <Signin data={{setShow}} ticket={ticket}/>
                </div>
            </div>
        );
    }
    else if (show === 3){
        return(
            <div className='confirmation'>
                <h1>Confirmation de votre adresse email nécessaire avant l'activation de votre compte</h1>
                <p className='notice'>
                    Votre compte a bien été créé mais il n'est pas encore activé. Cela signifie que vous ne pouvez pas encore vous connecter pour récupérer votre lot.<br/>
                    Veuillez dès à présent confirmer votre compte en cliquant sur le lien dans le mail de confirmation qui vient de vous être envoyé.<br/>
                    Vous n'avez pas reçu le mail ? Pensez à regarder vos courriers indésirables.
                </p>
                <p className='response'>En attente de votre confirmation...</p>
            </div>
        );
    }
    else if (show === 3.1){
        return(
            <div className='confirmation'>
                <h1>Confirmation de votre adresse email nécessaire avant l'activation de votre compte</h1>
                <p className='notice'>
                    Votre compte a bien été créé mais il n'est pas encore activé. Cela signifie que vous ne pouvez pas encore vous connecter pour récupérer votre lot.<br/>
                    Malheureusement, l'email de confirmation ne vous pas été envoyé pour une raison indépendante de notre volonté. Votre adresse existe t-elle bel et bien ? Votre boîte mail est elle pleine ?<br/>
                    Si aucune de ces pistes ne résoud votre problème, nous vous invitons à nous contacter via notre <a href='/contact'>formulaire de contact</a>. Nous essayerons de vous répondre aussi vite que possible.
                </p>
            </div>
        );
    }
    else {
        if (auth) {
            return(
                <Wheel prize={prize} ticket={ticket}></Wheel>
            );
        } else {
            return(
                <Wheel prize={prize}></Wheel>
            );
        }
    }
}

export default Participate;