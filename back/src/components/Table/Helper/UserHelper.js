import React, { Fragment } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import { StatsCardEntity as StatsCard } from '@Components/StatsCard';
import VisibilityIcon from '@material-ui/icons/Visibility';

const tHead = () => {
    return (
        <Fragment>
            <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Rôles</th>
                <th>Newsletter</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
            </tr>
        </Fragment>
    );
};

const row = (props) => {
    const { row: user, setOpen, setId } = props;
    const roles = Object.entries(user.roles).map(([index, role]) => {
        return index < (user.roles.length - 1) ? role.name + ", " : role.name;
    });
    const date = new Date(user.createdAt);
    const formattedDate = date.toLocaleString();
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
                <td>{ user.id }</td>
                <td>{ user.email }</td>
                <td>{ user.firstname }</td>
                <td>{ user.lastname }</td>
                <td>{ roles }</td>
                <td>{ user.newsletter ? "Inscrit" : "Non-inscrit" }</td>
                <td>{ formattedDate }</td>
                <td className='row-actions'>
                    { isEmployee ?
                        (
                            <Fragment>
                                <Link to={ '/users/edit/' + user.id } aria-label='Voir un utilisateur'>
                                    <Tooltip title='Voir'>
                                        <VisibilityIcon className='edit'/>
                                    </Tooltip>
                                </Link>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <Link to={ '/users/edit/' + user.id } aria-label='Modifier un utilisateur'>
                                    <Tooltip title='Modifier'>
                                        <EditIcon className='edit'/>
                                    </Tooltip>
                                </Link>
                                <Link aria-label='Supprimer un utilisateur'>
                                    <Tooltip title='Supprimer'>
                                        <DeleteIcon className='delete' role='button' onClick={ () => { setOpen(true); setId(user.id); } }/>
                                    </Tooltip>
                                </Link>
                            </Fragment>
                        )
                    }
                </td>
            </tr>
        </Fragment>
    );
};

const stats = (props) => {
    const { stats } = props;

    return (
        <Fragment>
            <StatsCard stats={ stats.clients }>Nombre de clients</StatsCard>
            <StatsCard stats={ stats.newsletter }>Nombre d'inscrits à la newsletter</StatsCard>
        </Fragment>
    );
};

export {
    tHead,
    row,
    stats,
};
