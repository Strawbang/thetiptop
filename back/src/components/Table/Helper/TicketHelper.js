import React, { Fragment } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import { StatsCardEntity as StatsCard } from '@Components/StatsCard';

const tHead = () => {
    return (
        <Fragment>
            <tr>
                <th>Id</th>
                <th>Numéro</th>
                <th>Lot</th>
                <th>Statut</th>
                <th>Dernière mise à jour</th>
                <th>Actions</th>
            </tr>
        </Fragment>
    );
};

const row = (props) => {
    const { row: ticket, setOpen, setId } = props;
    let status;
    const date = new Date(ticket.updatedAt);
    let formattedDate =  <span aria-label='Non défini'>N/D</span>;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    let accessibilityDate = date.toLocaleString('default', options);

    if (ticket.userId) {
        status = <Link title="Aller sur la page du propriétaire du ticket" to={'/users/edit/' + ticket.userId }>Validé</Link>;
        formattedDate = <span aria-label={ accessibilityDate }>{date.toLocaleString()}</span>;

    }
    else if (ticket.printed) {
        status = 'Imprimé';
        formattedDate = <span aria-label={ accessibilityDate }>{date.toLocaleString()}</span>;
    }
    else {
        status = 'Non imprimé';
    }

    return (
        <Fragment>
            <tr>
                <td>{ ticket.id }</td>
                <td>{ ticket.number }</td>
                <td>{ ticket.prize }</td>
                <td>{ status  }</td>
                <td>{ formattedDate }</td>
                <td className='row-actions'>
                    <Link to={ '/tickets/edit/' + ticket.id } aria-label='Voir un ticket'>
                        <Tooltip title='Voir'>
                            <VisibilityIcon className='edit'/>
                        </Tooltip>
                    </Link>
                </td>
            </tr>
        </Fragment>
    );
};

const stats = (props) => {
    const { stats } = props;

    return (
        <Fragment>
            <StatsCard stats={ stats.printed }>Nombre de tickets imprimés</StatsCard>
            <StatsCard stats={ stats.claimed }>Nombre de tickets validés</StatsCard>
        </Fragment>
    );
};

export {
    tHead,
    row,
    stats,
};
