import React, { Fragment, useEffect, useState } from 'react';
import './index.scss';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import TTTable from '@Components/Table';
import { useDispatch, useSelector } from "react-redux";
import { getTicketsPagination, getTicketCount, getPrintedTicketCount, getClaimedTicketCount } from "@Components/Redux/Actions/reduxActionTicket";
import Pagination from '@material-ui/lab/Pagination';
import { stats as StatsRow } from '@Components/Table/Helper/TicketHelper';

const Ticket = (props) => {
    const   reducer = useSelector(state => state.ticket),
            {   rows : tickets,
                count,
                currentPage,
                stats,
            } = reducer,
            dispatch = useDispatch(),
            [numberOfPages, setNumberOfPages] = useState(1),
            [statsHTML, setStatsHTML] = useState(null),
            limit = 20;
    
    useEffect( () => {
        let query = {
            limit: limit,
            page: 1,
        };

        query.offset = 0;
        dispatch(getTicketsPagination(query));
        dispatch(getTicketCount());
        dispatch(getPrintedTicketCount());
        dispatch(getClaimedTicketCount());
    }, []);

    useEffect( () => {
        setNumberOfPages(Math.ceil(count / limit));
    }, [count]);

    useEffect( () => {
        if (stats) {
            setStatsHTML(<StatsRow stats={ stats }></StatsRow>);
        }
    }, [stats]);

    const handleChange = (event, value) => {
        const query = {
            limit: limit,
            page: value,
        };

        query.offset = (value - 1) * query.limit;
        dispatch(getTicketsPagination(query));        
    };

    const tableInfo = (
        count > 20 ?
        <div className='table-nav'>
            <Pagination page={ currentPage } count={ numberOfPages } siblingCount={2} boundaryCount={1} onChange= { handleChange } />
        </div> : null
    );
    
    const from = new Intl.NumberFormat().format((currentPage - 1) * limit);
    const to = (currentPage * limit) < count ? new Intl.NumberFormat().format(currentPage * limit) : new Intl.NumberFormat().format(count);
    const countStr = new Intl.NumberFormat().format(count);

    const html = (
        <Fragment>
            <div className={ 'ticket-stats' }>
                { statsHTML }
            </div>
            <hr/>
            <div className='table-top'>
                <div className='table-info'>
                    { count > limit ? from + " à " + to + " sur " + countStr + " résultats" : countStr + " résultat(s)" }
                </div>
                { tableInfo }
            </div>
            <TTTable rows={ tickets }>tickets</TTTable>
            <div className='table-bot'>
                <div className='table-info'>
                    { count > limit ? from + " à " + to + " sur " + countStr + " résultats" : countStr + " résultat(s)" }
                </div>
                { tableInfo }
            </div>
        </Fragment>
    );

    return(
        <div className='dashboard'>
            <div className='row'>
                <Nav/>
                <Main title='Tickets' html={ html }>tickets</Main>
            </div>
        </div>
    );
};

export default Ticket;
