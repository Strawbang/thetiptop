import { Fragment, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon} from "@material-ui/core";
import profilService from "./profilService";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './index.css';


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
    const classes = useStyles();

    const getUser = async () => {
        await profilService.getUser().then((response)=> {
            setUser(response);
        })
    }

    const updateUser = async (user) => {
        await profilService.updateUser(user).then((response) =>{
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        updateUser(user);
    }


    useEffect(()=>{
        if(count < 1){
            getUser();
            setCount(1);
        }
    })

    let prizeRows;
    let prizeTable;

    if (user) {
        if (Array.isArray(user.tickets)) {
            if (user.tickets.length > 0) {
                prizeRows = user.tickets.map( (ticket, index) => {
                    const date = new Date(ticket.updatedAt);
                    const formattedDate = date.toLocaleString();
    
                    return (
                        <Fragment>
                            <tr className="gainRow">
                                <td className="gainField gainFieldGreen">{ ticket.id }</td>
                                <td>{ formattedDate }</td>
                                <td className="gainFieldGreen">{ ticket.prize }</td>
                                <td>En préparation</td>
                                <td>Livré sous 5 à 10 jours ouvrés</td>
                            </tr>
                        </Fragment>
                    );
                });

                prizeTable = (
                    <div className="profil">
                        <div className="gainTitle">
                            <p>Mes gains</p>
                        </div>
                        <div className="gainHeader">
                            <tr className="gainRow">
                                <th className="gainRowTitle">N °</th>
                                <th className="gainRowTitle">Validé le</th>
                                <th className="gainRowTitle">Lot</th>
                                <th className="gainRowTitle">Statut de la livraison</th>
                                <th className="gainRowTitle">Note</th>
                            </tr>
                        </div>
                        <div className="gainList">
                            <hr/>
                            <div className="gain">
                                { prizeRows }
                            </div>
                        </div>
                        <div className="gainParticipate">
                            <Link to='participate'>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} endIcon={<Icon>send</Icon>}>
                                    Participer a nouveau
                                </Button>
                            </Link>
                        </div>
                    </div>
                );
            }
            else {
                prizeTable = (
                    <p>Vous n'avez aucun lot.</p>
                );
            }
        }
    };

    return(
        <div className="boxProfil">
            <div className="navProfil">
                <div className="navButtons">
                    <NavLink exact  to='dashboard' className="navMonProfil" activeClassName="active">
                        <p>Mon Profil</p>
                    </NavLink >
                    <NavLink  to='myprizes'className="navMesGain" activeClassName="active">
                        <p>Mes gains</p>
                    </NavLink >
                </div>
            </div>
            <div className="frameProfil">
                { prizeTable }
            </div>
        </div>
    )

}

export default Profil;