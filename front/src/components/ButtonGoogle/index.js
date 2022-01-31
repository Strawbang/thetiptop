import { Fragment } from 'react';
import './index.css';

function ButtonGoogle (props){
    const title = props.title;
    let url = process.env.REACT_APP_API + 'auth/googleAuth';
    let ticketNumber = 0
    if(props.number) {
        ticketNumber = props.number
        url = process.env.REACT_APP_API + 'auth/googleAuth?ticket=' + ticketNumber;
    }

    return(
        <Fragment>
            <button className='frameGoogleSignIn' variant="outlined" color="primary"><a href={url}>{title}</a></button>
        </Fragment>
    );
}

export default ButtonGoogle;