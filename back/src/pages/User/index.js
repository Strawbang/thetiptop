import React, { useEffect, useState, Fragment } from 'react';
import './index.scss';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import TTTable from '@Components/Table';
import { useDispatch, useSelector } from "react-redux";
import { getUserCount, getUsersPagination, getClientsCount, getNewsletterUserCount } from "@Components/Redux/Actions/reduxActionUser";
import Pagination from '@material-ui/lab/Pagination';
import { stats as StatsRow } from '@Components/Table/Helper/UserHelper';

const User = (props) => {
    const   reducer = useSelector(state => state.user),
    {   rows : users,
        count,
        currentPage,
        stats
    } = reducer;
    const dispatch = useDispatch();
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [statsHTML, setStatsHTML] = useState(null);
    const limit = 20;
        
    useEffect( () => {
        let query = {
            limit: limit,
            page: 1,
        };

        query.offset = 0;
        dispatch(getUsersPagination(query));
        dispatch(getUserCount());
        dispatch(getClientsCount());
        dispatch(getNewsletterUserCount());
    }, []);

    useEffect( () => {
        setNumberOfPages(Math.ceil(count / limit));
    }, [count]);

    useEffect(() => {
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
        dispatch(getUsersPagination(query));        
    };

    const tableInfo = (
        count > limit ?
        <div className='table-nav'>
            <Pagination page={ currentPage } count={ numberOfPages } siblingCount={2} boundaryCount={1} onChange= { handleChange } />
        </div> : null
    );
    
    const from = new Intl.NumberFormat().format((currentPage - 1) * limit);
    const to = (currentPage * limit) < count ? new Intl.NumberFormat().format(currentPage * limit) : new Intl.NumberFormat().format(count);
    const countStr = new Intl.NumberFormat().format(count);

    const html = (
        <Fragment>
            <div className={ 'user-stats' }>
                { statsHTML }
            </div>
            <hr/>
            <div className='table-top'>
                <div className='table-info'>
                    { count > limit ? from + " à " + to + " sur " + countStr + " résultats" : countStr + " résultat(s)" }
                </div>
                { tableInfo }
            </div>
            <TTTable rows={ users }>users</TTTable>
            <div className='table-bot'>
                <div className='table-info'>
                { count > limit ? from + " à " + to + " sur " + countStr + " résultats" : countStr + " résultat(s)" }
                </div>
            </div>
        </Fragment>
    );

    return(
        <div className='dashboard'>
            <div className='row'>
                <Nav/>
                <Main title='Utilisateurs' html={ html }>users</Main>
            </div>
        </div>
    );
};

export default User;
