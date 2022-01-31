import { Button, Icon, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import './index.css';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function Password(props){
    const classes = useStyles();
    const { data, user } = props;
    const newPasswordValue = {};

    const passwordUpdate = (tags) => (event) => {
      if (tags === 'oldPassword') {
        newPasswordValue.oldPassword = event.target.value
      } else if (tags === 'newPassword1') {
        newPasswordValue.newPassword1 = event.target.value
      } else {
        newPasswordValue.newPassword2 = event.target.value
      }
      let errorMsg = document.querySelector('.profil .error-msg');
                
      errorMsg.classList.remove('show');
      errorMsg.innerHTML = '';
    }
    return(
        <form onSubmit={user.updatePassword(newPasswordValue)}>
          <div className="boxPasswordForm">
            <div className="passwordForm">
              <TextField
                className="passwordField"
                id="standard-basic"
                label="Saisir votre ancien mot de passe"
                data-testid="oldPassword"
                name='oldPassword'
                placeholder='Ancien mot de passe'
                onChange={passwordUpdate('oldPassword')}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.oldPassword}
              />
            </div>
            <div className="passwordForm">
              <TextField
                className="passwordField"
                id="standard-basic"
                label="Saisir un nouveau mot de passe"
                data-testid="newPassword1"
                name='newPassword1'
                placeholder='Nouveau mot de passe'
                onChange={passwordUpdate('newPassword1')}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.newPassword1}
              />
              <TextField
                className="passwordField"
                id="standard-basic"
                label="Resaisir un nouveau mot de passe"
                data-testid="newPassword2"
                name='newPassword2'
                placeholder='Ressaisir nouveau mot de passe'
                onChange={passwordUpdate('newPassword2')}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                value={data.newPassword2}
              />
            </div>
            <div className="passwordSubmitForm">
              <Button type="submit" variant="contained" color="primary" className={classes.button} endIcon={<Icon>send</Icon>}>
                Valider
              </Button>
            </div>
          </div>
        </form>
    );
}

export default Password;