import { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import ProfilDetail from "../ProfilDetail";
import DeleteIcon from '@material-ui/icons/Delete';
import Adresse from "../Adresse";
import Password from "../Password";
import profilService from "./profilService";
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../Redux/reduxActionAuth";
import './index.css';
import Alert from '@mui/material/Alert';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

function Profil(){
    
    const [user, setUser] = useState('');
    const [count, setCount] = useState('');
    const [expandAddress, setexpand] = useState('false');
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    let errors = [];
    let error = false;
    const res = {};
    
    
    const deleteAccount = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Une fois votre compte supprimé, vous ne pouvez plus revenir en arrière.")) {
            dispatch(deleteUser());
        }
       
    };

    const getUser = async () => {
        await profilService.getUser().then((response)=> {
            setUser(response);
        })
    }

    const updateUser = async (user) => {
        await profilService.updateUser(user).then((response) =>{
            if (response.successful) {
                let alert = document.querySelector('.profil .alertAdd-msg');

                alert.classList.add('show');
                window.location.reload(false);
                alert.innerHTML = response.message;
            } else {
                let errorMsg = document.querySelector('.profil .errorAdd-msg');

                errorMsg.classList.add('show');
                errorMsg.innerHTML = response.message;
            }
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        updateUser(user);
    }

    const updatePassword = datad => (event) =>{
        event.preventDefault();
        updateUserPassword(user, datad);
    }

    const updateUserPassword = async (user, datad) => {
        const info = {}
        
        info.user = user
        info.datad = datad

        await profilService.updatePassword(info).then((response) =>{
            if (response.successful) {
                let alert = document.querySelector('.profil .alert-msg');

                alert.classList.add('show');
                alert.innerHTML = response.message;
            } else {
                let errorMsg = document.querySelector('.profil .error-msg');

                errorMsg.classList.add('show');
                errorMsg.innerHTML = response.message;
            }
        })
    }

    useEffect(()=>{
        if(count < 1){
            getUser();
            setCount(1);
        }
        if (history.location.state) {
            if (history.location.state.address === 'none') {
                setexpand(true);
                let alert = document.querySelector('.profil .errorAdd-msg');

                alert.classList.add('show');
                alert.innerHTML = 'Merci de saisir votre addresse afin de profiter du jeu-concour';
            } 
        } else {
            let alert = document.querySelector('.profil .errorAdd-msg');
                
            alert.classList.remove('show');
            alert.innerHTML = '';
        }
    })
    return(
        <div className="boxProfil">
            <div className="navProfil">
                <div className="navButtons">
                    <NavLink exact  to='dashboard' className="navMonProfil" activeClassName="active">
                        <p>Mon profil</p>
                    </NavLink >
                    <NavLink  to='myprizes'className="navMesGain" activeClassName="active">
                        <p>Mes gains</p>
                    </NavLink >
                </div>
            </div>
            <div className="frameProfil">
                <div className="profil">
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography component={'div'} className={classes.heading}>Mes informations</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'div'} className="fullWidth">
                                <ProfilDetail data={user} user={{setUser, handleSubmit}} />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded={expandAddress}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            <Typography component={'div'} className={classes.heading}>Adresse</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'div'} className="fullWidth">
                                <Adresse data={user} user={{setUser, handleSubmit}}/>
                            </Typography>
                        </AccordionDetails>
                        <Alert severity="success" color="error" className='errorAdd-msg fullWidthCenter'></Alert>
                        <Alert severity="success" color="success" className='alertAdd-msg fullWidthCenter'></Alert>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        >
                            <Typography component={'div'} className={classes.heading}>Mot de passe</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'div'} className="fullWidth">
                                <Password data={user} user={{setUser, updatePassword}}/>
                            </Typography>
                        </AccordionDetails>
                        <Alert severity="success" color="error" className='error-msg fullWidthCenter'>
                        </Alert>
                        <Alert severity="success" color="success" className='alert-msg fullWidthCenter'>
                        </Alert>
                    </Accordion>
                    <center><Button onClick={deleteAccount} className={classes.button} color="secondary" startIcon={<DeleteIcon />} >Supprimer mon compte</Button></center>
                </div>
            </div>
        </div>
    )

}

export default Profil;