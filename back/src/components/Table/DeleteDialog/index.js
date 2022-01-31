import React, {} from 'react';
import './index.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const DeleteDialog = (props) => {
    const { open, setOpen, id, handleDelete, children } = props;
    let entityAssoc;

    const handleClose = () => {
        setOpen(false);
    };

    switch (children) {
        case 'users':
            entityAssoc = {
                demonstrative: "cet utilisateur",
                definite: "un utilisateur",
            };
            break;
        case 'roles':
            entityAssoc = {
                demonstrative: "ce rôle",
                definite: "un rôle",
            };
            break;
        case 'tickets':
            entityAssoc = {
                demonstrative: "ce ticket",
                definite: "un ticket",
            };
            break;
        default:
            ;
    }

    return (
        <div>
            <Dialog open={ open } onClose={ handleClose }>
                <DialogTitle>Supprimer { entityAssoc.definite }</DialogTitle>
                <DialogContent>
                    <DialogContentText>Êtes-vous sûr de vouloir supprimer { entityAssoc.demonstrative } ? Cette action est irréversible.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose }>Non</Button>
                    <Button onClick={ (e) => handleDelete(e, id) }>Oui</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteDialog;
