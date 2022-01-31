import React, { useEffect, useState } from 'react';
import './index.scss';
import { tHead as RoleTHead, row as RoleRow } from './Helper/RoleHelper';
import { tHead as UserTHead, row as UserRow } from './Helper/UserHelper';
import { tHead as TicketTHead, row as TicketRow } from './Helper/TicketHelper';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteUser } from '@Components/Redux/Actions/reduxActionUser';
import { deleteRole } from '@Components/Redux/Actions/reduxActionRole';
import { deleteTicket } from '@Components/Redux/Actions/reduxActionTicket';
import { Fragment } from 'react';
import DeleteDialog from '@Components/Table/DeleteDialog';


const Table = (props) => {
    const { children, rows } = props;
    let tHead;
    const [tBody, setTBody] = useState();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const roles = useSelector(state => state.auth.user ? state.auth.user.roles : null);
    const bin = useSelector(state => {
        switch(children) {
            case "users":
                return state.user.bin;
            case "roles":
                return state.role.bin;
            case "tickets":
                return state.ticket.bin;
            default:
                ;
        }
    });
    
    useEffect(() => {
        const renderRow = (row, index) => {
            switch(children) {
                case "users":
                    return (
                        <UserRow key={ index } row={ row } setOpen= { setOpen } setId={ setId } roles={ roles }></UserRow>
                    );
                case "roles":
                    return (
                        <RoleRow key={ index } row={ row } setOpen= { setOpen } setId={ setId } roles={ roles }></RoleRow>
                      );
                case "tickets":
                    return (
                        <TicketRow key={ index } row={ row } setOpen= { setOpen } setId={ setId }></TicketRow>
                    );
                default:
                    ;
            }
        };

        if (rows) {
            setTBody(
                Object.entries(rows).map(([index, row]) => {
                    return (renderRow(row, index));
                })
            );
        }
    }, [rows, children]);

    useEffect(() => {
        if (bin === true) {
            history.go(0);
        }
    }, [bin]);

    const handleDelete = (e, id) => {
        setOpen(true);

        switch(children) {
            case "users":
                dispatch(deleteUser(id));
                break;
            case "roles":
                dispatch(deleteRole(id));
                break;
            case "tickets":
                dispatch(deleteTicket(id));
                break;
            default:
                ;
        }
    };

    switch(children) {
        case "users":
            tHead = <UserTHead></UserTHead>
            break;
        case "roles":
            tHead = <RoleTHead></RoleTHead>;
            break;
        case "tickets":
            tHead = <TicketTHead></TicketTHead>
            break;
        default:
            ;
    }

    return(
        <Fragment>
            <DeleteDialog open={ open } setOpen={ setOpen } id={ id } handleDelete={ handleDelete }>{ children }</DeleteDialog>
            <hr/>
            <div className='table-container'>
                <div className='top'>
                    <div className='filters'></div>
                </div>
                <table>
                    <thead>
                        { tHead }
                    </thead>
                    <tbody>
                        { tBody }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default Table;
