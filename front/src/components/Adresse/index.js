import { Button, Icon, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function Adresse(props){
    const classes = useStyles();
    const { data, user } = props;

    const handleChange = (event) => {
      user.setUser({
          [event.target.name]: event.target.value
      })
    }
    return(
    <form onSubmit={user.handleSubmit}>
      <div className="boxAdressForm">
        <div className="adressForm">
          <TextField 
          className="adressField" 
          data-testid="address" 
          id="standard-basic" 
          name='address' 
          label="N ° et Nom de rue"
          placeholder='N ° et Nom de rue'
          value={data.address}
          onChange={handleChange}
          InputLabelProps={{
                        shrink: true,
                    }} />
        </div>
        <div className="adressForm">
          <TextField
          className="adressFieldSmall"
          data-testid="postcode"
          id="standard-basic"
          name='postcode'
          label="Code postal"
          placeholder='Code postal'
          value={data.postcode}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }} />
          <TextField className="adressFieldSmall"
          data-testid="city"
          id="standard-basic"
          name='city'
          label="Ville"
          placeholder='Ville'
          value={data.city}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }} />
        </div>
        <div className="adressSubmitForm">
          <Button type="submit" variant="contained" color="primary" className={classes.button} endIcon={<Icon>send</Icon>}>
            Valider
          </Button>
        </div>
      </div>
    </form>
    );
}

export default Adresse;