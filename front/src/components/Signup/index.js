import { useEffect, useState } from 'react';
import { signup } from '../Redux/reduxActionAuth';
import ButtonGoogle from '../ButtonGoogle';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import ButtonFacebook from '../ButtonFacebook';

function Signup(props){
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(0);
    const [newsletter, setNewsletter] = useState(false);
    const [cguRules, setCguRules] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector( state => state.auth);

    useEffect(() => {
        if (auth) {
            if (auth.isRegistered) {
                if (auth.isMailSent) {
                    props.data.setShow(3);
                }
                else {
                    props.data.setShow(3.1);
                }
            }
            else {
                if (auth.error) {
                    if (auth.error.status === 'email_already_used') {
                        document.querySelector('form.signup .email .error-msg').classList.add('show');
                        document.querySelector('form.signup .email .error-msg').innerHTML = auth.error.message;
                    }

                    document.querySelector('form.signup .error-msg.bot').classList.add('show');
                    document.querySelector('form.signup .error-msg.bot').innerHTML = auth.error.message;
                }
            }
        }
    }, [auth]);

    const checkFields = () => {
        const errorMessages = document.querySelectorAll('form.signup .error-msg');
        const nameExpr = /^[a-zà-ÿ0-9 -]{2,50}$/i;
        const birthdateExpr = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
        const emailExpr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const addressExpr = /^[a-zà-ÿ0-9 ',-]{10,38}$/gi;
        const postcodeExpr = /^[0-9]{5}$/gi;
        const cityExpr = /^[a-zà-ÿ '-]{1,45}$/gi;
        const passwordExpr = /^.{8,32}$/i;
        let errorMsg;
        let error = 0;

        errorMessages.forEach((msg) => {
            msg.classList.remove('show');
            msg.innerHTML = '';
        });

        document.querySelectorAll('form.signup .field').forEach( (field) => {
            if (field.querySelector('input').value === '') {
                field.querySelector('.error-msg').classList.add('show');
                field.querySelector('.error-msg').innerHTML = 'Ce champ doit obligatoirement être rempli.';
                error++;
            }
        });

        if (error > 0) {
            return false;
        }

        setFirstname(firstname.trim());
        setLastname(lastname.trim());
        setBirthdate(birthdate.trim());
        setEmail(email.trim());
        setAddress(address.trim());
        setPostcode(postcode.trim());
        setCity(city.trim());
        setPassword(password.trim());
        setConfirmPassword(confirmPassword.trim());

        if (!nameExpr.test(firstname)) {
            errorMsg = document.querySelector('form.signup .field.firstname .error-msg');
            errorMsg.classList.add('show');

            if (firstname.length < 2) {
                errorMsg.innerHTML = "Ce prénom est trop court.";
            }
            else if (firstname.length > 50) {
                errorMsg.innerHTML = "Ce prénom est trop long.";
            }
            else {
                errorMsg.innerHTML = "Ce prénom est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            }

            errorMsg.innerHTML = "Ce prénom est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            error++;
        }

        if (!nameExpr.test(lastname)) {
            errorMsg = document.querySelector('form.signup .field.lastname .error-msg');
            errorMsg.classList.add('show');

            if (lastname.length < 2) {
                errorMsg.innerHTML = "Ce nom de famille est trop court.";
            }
            else if (lastname.length > 50) {
                errorMsg.innerHTML = "Ce nom de famille est trop long.";
            }
            else {
                errorMsg.innerHTML = "Ce nom de famille est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            }
            
            error++;
        }

        if (!birthdateExpr.test(birthdate)) {
            errorMsg = document.querySelector('form.signup .field.birthdate .error-msg');
            errorMsg.classList.add('show');
            errorMsg.innerHTML = "Cette date de naissance est invalide.";
            error++;
        }

        let bday = new Date(Date.parse(birthdate));
        let yearsAgo18 = new Date();

        yearsAgo18.setHours(0, 0, 0);
        bday.setHours(0, 0, 0);
        yearsAgo18.setFullYear(yearsAgo18.getFullYear() - 18);
        
        if (yearsAgo18.getTime() < bday.getTime()) {
            errorMsg = document.querySelector('form.signup .field.birthdate .error-msg');
            errorMsg.classList.add('show');
            errorMsg.innerHTML = "Il faut être majeur pour pouvoir participer au jeu-concours de Thé Tip Top.";
            error++;
        }

        if (!emailExpr.test(email)) {
            errorMsg = document.querySelector('form.signup .field.email .error-msg');
            errorMsg.classList.add('show');
            errorMsg.innerHTML = "Cet email est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            error++;
        }

        if (!addressExpr.test(address)) {
            errorMsg = document.querySelector('form.signup .field.address .error-msg');
            errorMsg.classList.add('show');

            if (address.length < 10) {
                errorMsg.innerHTML = "Cette adresse est trop courte.";
            }
            else if (address.length > 38) {
                errorMsg.innerHTML = "Cette adresse est trop longue.";
            }
            else {
                errorMsg.innerHTML = "Ce champ est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            }

            errorMsg.innerHTML = "Cette adresse est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            error++;
        }

        if (!postcodeExpr.test(postcode)) {
            errorMsg = document.querySelector('form.signup .field.postcode .error-msg');
            errorMsg.classList.add('show');

            if (postcode.length !== 5) {
                errorMsg.innerHTML = "Le code postal doit exactement être composé de 5 caractères.";
            }
            else {
                errorMsg.innerHTML = "Ce code postal est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            }

            error++;
        }

        if (!cityExpr.test(city)) {
            errorMsg = document.querySelector('form.signup .field.city .error-msg');
            errorMsg.classList.add('show');

            if (city.length > 45) {
                errorMsg.innerHTML = "Ce nom de ville est trop long.";
            }
            else {
                errorMsg.innerHTML = "Ce nom de ville est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits."
            }

            error++;
        }

        if (!passwordExpr.test(password)) {
            errorMsg = document.querySelector('form.signup .field.password .error-msg');
            errorMsg.classList.add('show');

            if (password.length < 8) {
                errorMsg.innerHTML = "Ce mot de passe est trop court.";
            }
            else if (password.length > 32) {
                errorMsg.innerHTML = "Ce mot de passe est trop long.";
            }
            else {
                errorMsg.innerHTML = "Ce champ est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits.";
            }

            error++;
        }

        if (!passwordExpr.test(confirmPassword)) {
            errorMsg = document.querySelector('form.signup .field.confirm-password .error-msg');
            errorMsg.classList.add('show');

            if (confirmPassword.length < 8) {
                errorMsg.innerHTML = "Ce mot de passe est trop court.";
            }
            else if (confirmPassword.length > 32) {
                errorMsg.innerHTML = "Ce mot de passe est trop long.";
            }
            else {
                errorMsg.innerHTML = "Ce mot de passe est invalide. Il ne respecte pas le format requis ou comporte des caractères interdits.";
            }

            error++;
        }

        if (password !== confirmPassword) {
            errorMsg = document.querySelector('form.signup .field.confirm-password .error-msg');
            errorMsg.classList.add('show');
            errorMsg.innerHTML = "Les deux mots de passe ne correspondent pas. Veuillez les entrer à nouveau.";
            error++;
        }

        if (!cguRules) {
            errorMsg = document.querySelector('form.signup .field.cgu-rules .error-msg');
            errorMsg.classList.add('show');
            errorMsg.innerHTML = "Veuillez accepter les conditions générales d'utilisation et le réglement du jeu-concours.";
            error++;
        }

        if (error > 0) {
            document.querySelector('.error-msg.bot').classList.add('show');
            document.querySelector('.error-msg.bot').innerHTML = 'Des erreurs ont été détectés dans le formulaire. Veuillez les corriger.';
            return false;
        }

        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!checkFields()) {
            return false;
        }

        const user = {
            firstname,
            lastname,
            birthdate,
            email,
            password,
            address,
            postcode,
            city,
            number: props.ticket,
            newsletter: newsletter,
        }

        dispatch(signup(user));
    }
    

    return(
        <form className='signup' onSubmit={handleSubmit}>
            <h2>Pas de compte ? Inscrivez-vous !</h2>
            <ButtonGoogle number={props.ticket} title='Inscription avec Google'/>
            <ButtonFacebook number={props.ticket} title='Inscription avec Facebook'/>
            <div className='separator'>
                <hr/>
                <span>OU</span>
            </div>
            <div className='field firstname'>
                <label>
                    Prénom:
                    <input
                    name="firstname"
                    type="text"
                    placeholder='Prénom'
                    autoComplete='first-name'
                    maxLength='50'
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field lastname'>
                <label>
                    Nom de famille:
                    <input
                    name="lastname"
                    type="text"
                    placeholder='Nom de famille'
                    autoComplete='family-name'
                    maxLength='50'
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field birthdate'>
                <label>
                    Date de naissance:
                    <input
                    name="birthdate"
                    type="date"
                    placeholder='Date de naissance'
                    autoComplete='bday'
                    value={birthdate}
                    onChange={e => setBirthdate(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field email'>
                <label>
                    Email:
                    <input
                    name="email"
                    type="email"
                    placeholder='Email'
                    autoComplete='email'
                    value={email}
                    maxLength='50'
                    onChange={e => setEmail(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field address'>
                <label>
                    Adresse:
                    <input
                    name="address"
                    type="text"
                    placeholder='Adresse'
                    autoComplete=''
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    maxLength='45'
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field postcode'>
                <label>
                    Code postal:
                    <input
                    name="postcode"
                    type="text"
                    placeholder='Code postal'
                    autoComplete='postal-code'
                    value={postcode}
                    maxLength='5'
                    onChange={e => setPostcode(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field city'>
                <label>
                    Ville:
                    <input
                    name="city"
                    type="text"
                    placeholder='Ville'
                    autoComplete='address-level2'
                    value={city}
                    maxLength='45'
                    onChange={e => setCity(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field password'>
                <label>
                    Mot de passe (minimum 8 caractères):
                    <input
                    name="password"
                    type="password"
                    placeholder='Mot de passe'
                    autoComplete=''
                    value={password}
                    maxLength='50'
                    onChange={e => setPassword(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field confirm-password'>
                <label>
                    Confirmation du mot de passe:
                    <input
                    name="confirm-password"
                    type="password"
                    placeholder='Confirmation du mot de passe'
                    autoComplete=''
                    maxLength='50'
                    onChange={e => setConfirmPassword(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field newsletter'>
                <label>
                    <input
                    name="newsletter"
                    type="checkbox"
                    onChange={e => setNewsletter(e.target.checked)}/>
                    En cochant cette case, j'accepte de recevoir la newsletter Thé Tip Top. Je pourrais me désinscrire à tout moment.
                </label>
                <p className='error-msg'></p>
            </div>
            <div className='field cgu-rules'>
                <label>
                    <input
                    name="cgu-rules"
                    type="checkbox"
                    onChange={e => setCguRules(e.target.checked)}
                    required />
                    J'ai lu et j'accepte les <a href='/cgu' target='_blank'>conditions générales d'utilisation</a> et le <a href='/rules' target='_blank'>réglement</a> du jeu-concours.
                </label>
                <p className='error-msg'></p>
            </div>
            <p className='error-msg bot'>Des erreurs ont été détectés dans le formulaire. Veuillez corriger les champs concernés.</p>
            <button type='submit'>Envoyer</button>
        </form>
    );
}

export default Signup;