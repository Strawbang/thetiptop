import React, { Fragment } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

const tHead = () => {
    return (
        <Fragment>
            <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Actions</th>
            </tr>
        </Fragment>
    );
};

const row = (props) => {
    const { row: role, setOpen, setId } = props;
    const currentUserRoles = props.roles;
    let isEmployee;

    currentUserRoles.forEach((role) => {
        if (role.name === 'Admin') {
            isEmployee = false;
            return false;
        }
        else if (role.name === 'Employee') {
            isEmployee = true;
        }
    });

    return (
        <Fragment>
            <tr>
                <td>{ role.id }</td>
                <td>{ role.name }</td>
                <td className='row-actions'>
                    { isEmployee ?
                        <Fragment>
                            Aucune action possible
                        </Fragment> :
                        <Fragment>
                        <Link to={ '/roles/edit/' + role.id } aria-label='Modifier un rôle'>
                            <Tooltip title='Modifier'>
                                <EditIcon className='edit'/>
                            </Tooltip>
                        </Link>
                        <Link to="#" aria-label='Supprimer un rôle'>
                            <Tooltip title='Supprimer'>
                                <DeleteIcon className='delete' onClick={ () => { setOpen(true); setId(role.id); } }/>
                            </Tooltip>
                        </Link>
                    </Fragment>
                    }
                </td>
            </tr>
        </Fragment>
    );
};

export {
    tHead,
    row,
};
