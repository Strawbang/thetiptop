import React, { useEffect } from 'react';
import './index.scss';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCount } from "@Components/Redux/Actions/reduxActionUser";
import { getRoleCount } from "@Components/Redux/Actions/reduxActionRole";
import { getTicketCount, getPrintedTicketCount, getClaimedTicketCount } from "@Components/Redux/Actions/reduxActionTicket";
import { Fragment } from 'react';
import { numToAbbrString } from '@Utilities';

const StatsCardMain = (props) => {
    const { children } = props;
    const entityCount = useSelector(state => {
        if (children === 'users') {
            return state.user.count;
        }
        else if (children === 'roles') {
            return state.role.count;
        }
        else if (children === 'tickets') {
            return state.ticket.count;
        }
    });
    const dispatch = useDispatch();
    let entityName;

    switch(children) {
        case 'users':
            entityName = 'Utilisateurs';
            break;
        case 'roles':
            entityName = 'Rôles';
            break;
        case 'tickets':
            entityName = 'Tickets';
            break;
        default:
            break;
    };

    useEffect(() => {
        if (!entityCount) {
            if (children === 'users') {
                dispatch(getUserCount());
            }
            else if (children === 'roles') {
                dispatch(getRoleCount());
            }
            else if (children === 'tickets') {
                dispatch(getTicketCount());
            }
        }
    }, []);

    let eCString = new Intl.NumberFormat().format(entityCount);
    let eCStringAbbr = entityCount ? numToAbbrString(entityCount) : null;

    return(
        <div className={ 'card ' + children }>
            <div className='content'>
                <div className='name'>
                    <h2 className=''>{ entityName }</h2>
                </div>
                <div className='preview-data'>
                    <div className='count'>
                        <span className='full'>{ eCString }</span>
                        <span className='abbr'>{ eCStringAbbr }</span>
                    </div>
                </div>
                <Link to={ '/' + children }>Plus de détails</Link>
            </div>
        </div>
    );
};

const StatsCardEntity = (props) => {
    const { children, stats } = props;
    let statsStringAbbr = numToAbbrString(stats);
    
    return(
        <div className={ 'card' }>
            <div className='content'>
                <div className='name'>
                    <h2 className=''>{ children }</h2>
                </div>
                <div className='preview-data'>
                    <div className='count'>
                        <span className='full'>{ stats }</span>
                        <span className='abbr'>{ statsStringAbbr }</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatsCard = (
    <Fragment>

    </Fragment>
);

export {
    StatsCardMain,
    StatsCardEntity,
};
export default StatsCard;
