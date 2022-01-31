import { Button, Icon, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import './index.css';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function ProfilDetail(props){
    const classes = useStyles();
    const { data, user } = props;

    const handleChange = (event) => {
        user.setUser({
            [event.target.name]: event.target.value
        })
    }

    return(
        <form onSubmit={user.handleSubmit}>
            <div className="boxProfilForm">
                <div className="profilForm">
                    <TextField
                    className="profilField"
                    id="standard-basic"
                    name='firstname'
                    label="Prénom"
                    placeholder='Prénom'
                    value={data.firstname}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                    <TextField
                    className="profilField"
                    id="standard-basic"
                    name='lastname'
                    label="Nom"
                    placeholder='Nom'
                    value={data.lastname}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                </div>
                <div className="profilForm">
                    <TextField id="standard-basic"
                    className="profilField"
                    name='email'
                    label="Email"
                    placeholder='Email'
                    value={data.email}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}/>
                    <TextField
                        className="profilField"
                        id="date"
                        label="Date de naissance"
                        type="date"
                        placeholder='Date de naissance'
                        value={data.birthdate}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="profilForm profilSubmitForm">
                    <Button type="submit" variant="contained" color="primary" className={classes.button} endIcon={<Icon>send</Icon>}>
                        Valider
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default ProfilDetail;