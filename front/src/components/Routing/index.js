import { React } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Home from '../../pages/Home';
import Participate from '../../pages/Participate';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import MyPrizes from '../../pages/Dashboard/dashboardPrize'
import GameRules from '../../pages/GameRules';
import Prizes from '../../pages/Prizes';
import Contact from '../../pages/Contact';
import CGU from '../CGU';
import FAQ from '../../pages/FAQ';
import Confirmation from '../../pages/Confirmation';

import MentionsLegales from '../MentionsLegales';
import RGPD from '../RGPD';
import Cookies from '../CookiesPage';
const Routing = () => {

    const { user: auth } = useSelector((state) => state.auth);

    const PrivateRoute =({component: Component, ...rest}) => (
        auth ? <Component {...rest} /> : <Redirect to='/login' />
    )
    return(
        <Switch>
            <Route path='/' component={Home} exact></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/participate' component={Participate}></Route>
            <Route path='/confirmation' component={Confirmation}></Route>
            <Route path='/rules' component={GameRules}></Route>
            <Route path='/prizes' component={Prizes}></Route>
            <Route path='/CGU' component={CGU}></Route>
            <Route path='/FAQ' component={FAQ}></Route>
            <Route path='/legals' component={MentionsLegales}></Route>
            <Route path='/rgpd' component={RGPD}></Route>
            <Route path='/cookies' component={Cookies}></Route>
            <Route path='/contact' component={Contact}></Route>
            <PrivateRoute path='/dashboard' component={Dashboard}></PrivateRoute>
            <PrivateRoute path='/myprizes' component={MyPrizes}></PrivateRoute>
        </Switch>
    )
}

export default Routing;