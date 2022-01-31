import React, { useEffect, useState, Fragment } from 'react';
import './index.scss';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import TTTable from '@Components/Table';
import { useDispatch, useSelector } from "react-redux";
import { getRoleCount, getRolesPagination } from "@Components/Redux/Actions/reduxActionRole";
import Pagination from '@material-ui/lab/Pagination';

const Role = (props) => {
    const   reducer = useSelector(state => state.role),
    {   rows : roles,
        count,
        currentPage,} = reducer;
    const dispatch = useDispatch();
    const [numberOfPages, setNumberOfPages] = useState(1);
    const limit = 20;

    useEffect( () => {
        let query = {
            limit: limit,
            page: 1,
        };

        query.offset = 0;
        dispatch(getRolesPagination(query));
        dispatch(getRoleCount());
    }, []);

    useEffect( () => {
        setNumberOfPages(Math.ceil(count / limit));
    }, [count]);

    const handleChange = (event, value) => {
        const query = {
            limit: limit,
            page: value,
        };

        query.offset = (value - 1) * query.limit;
        dispatch(getRolesPagination(query));        
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
            <div className='table-top'>
                <div className='table-info'>
                    { count > limit ? from + " à " + to + " sur " + countStr + " résultats" : countStr + " résultat(s)" }
                </div>
                { tableInfo }
            </div>
            <TTTable rows={ roles }>roles</TTTable>
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
                <Main title='Rôles' html={ html }>roles</Main>
            </div>
        </div>
    );
};

export default Role;
