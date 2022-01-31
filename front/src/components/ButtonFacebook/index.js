import { Fragment } from 'react';
// import { Button } from '@material-ui/core';
import './index.css';

function ButtonFacebook (props){
    const title = props.title;
    let url = process.env.REACT_APP_API + 'auth/facebookAuth/';
    let ticketNumber = 0
    if(props.number) {
        ticketNumber = props.number
        url = process.env.REACT_APP_API + 'auth/facebookAuth?ticket=' + ticketNumber;
    }
    return(
        <Fragment>
                <button className='frameFacebookSignIn' variant="outlined" color="primary"><a href={url}>{title}</a></button>
        </Fragment>
    );
}

export default ButtonFacebook;