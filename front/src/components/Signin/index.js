import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../Redux/reduxActionAuth'
import ButtonGoogle from "../ButtonGoogle";

import './index.css';
import ButtonFacebook from "../ButtonFacebook";
 
function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [count, setCount] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email,
            password,
            number: props.ticket,
        }
        let errorMsg = document.querySelector('.frameSignIn .error-msg');
                
        errorMsg.classList.remove('show');
        errorMsg.innerHTML = '';
        dispatch(login(user));
    }
    useEffect(() => {
        if (auth !== null) {
            if (auth.isLoggedIn) {
                if(props.ticket){
                    props.data.setShow(4);
                    setCount(1);
                }
                else{
                    if (auth.user.address != null) {
                        history.push('/dashboard');
                    } else {
                        history.push({
                            pathname: '/dashboard',
                            state: { address: 'none'}
                        });
                    }
                }
            }
            else {
                if (auth.error) {
                    let errorMsg = document.querySelector('.frameSignIn .error-msg');

                    errorMsg.classList.add('show');
                    errorMsg.innerHTML = auth.error.message;
                }
            }
        }
    }, [auth])

    return(
        <div className="boxSignIn" style={{backgroundImage:`url(${props.image})`}}>
            <div className="frameSignIn">
                <div className="titleFrameSignIn">
                    <h1 className="titleSignIn">Me connecter à mon espace</h1>
                </div>
                <div className="formFrameSingIn">
                    <form className="formSingIn" onSubmit={handleSubmit}>
                        <label style={{textAlign: "-webkit-center"}}>
                            Identifiant / email:
                            <input
                            name="email"
                            type="email"
                            className="formFields"
                            placeholder="Identifiant / email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete='email'
                            required />
                        </label>
                        <label style={{textAlign: "-webkit-center"}}>
                            Mot de passe:
                            <input
                            name="password"
                            type="password"
                            className="formFields"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete=''
                            required />
                        </label>
                        <p className='error-msg'></p>
                        <div className="formInteraction">
                            <a className="formInteractionPassword">Mot de passe oublié ?</a>
                            <div className="formInteractionButton">
                                <button className="Login">Se connecter</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="socialSignIn">
                    <hr/>
                    <p className="titleSocialSignIn">Me connecter avec mes réseaux sociaux</p>
                    <ButtonGoogle number={props.ticket} title={'Google'}/>
                    <ButtonFacebook title={'Facebook'}/>
                </div>
            </div>
            {/*  */}
        </div>
    );
}

export default Signin;