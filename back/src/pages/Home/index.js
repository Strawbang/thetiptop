import React, {} from 'react';
import './index.scss';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import { StatsCardMain as StatsCard } from '@Components/StatsCard';

const Home = () => {
    const html = (
        <div className='statistic-overview'>
            <StatsCard>users</StatsCard>
            <StatsCard>roles</StatsCard>
            <StatsCard>tickets</StatsCard>
        </div>
    );

    return(
        <div className='dashboard'>
            <div className='row'>
                <Nav/>
                <Main title="Dashboard - Vue d'ensemble" home={ true } html={ html }></Main>
            </div>
        </div>
    );
};

export default Home;
