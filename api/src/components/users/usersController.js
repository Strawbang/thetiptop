const userService = require('./usersService');

const getCount = async (req, res) => {
    try {
        const response = await userService.getCount(req.query);
        await res.status(response.status).send(response.data);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

const findPerPage = async (req, res) => {
    try {
        if (!req.role.includes('Admin') && !req.role.includes('Employee')) {
            res.status(403).send({ message: "Vous n'avez pas les droits nécessaires pour accéder à cette ressource." });
            return;
        }

        const response = await userService.findPerPage(req.query);
        await res.status(response.status).send(response.data);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
};

const findAll = async (req, res) => {
    try {
        if (!req.role.includes('Admin') && !req.role.includes('Employee')) {
            res.status(403).send({ message: "Vous n'avez pas les droits nécessaires pour accéder à cette ressource." });
            return;
        }

        const response = await userService.findAll();
        await res.status(response.status).send(response.data);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

const findOne = async (req, res) => {
    try {
        if (!req.role.includes('Admin') &&
            !req.role.includes('Employee') &&
            (req.userId && req.query.id)) {
            res.status(403).send({ message: "Vous n'avez pas les droits nécessaires pour accéder à cette ressource." });
            return;
        }

        const id = req.query.id ? req.query.id : req.userId;
        const response = await userService.findOne(id);
        await res.status(response.status).send(response.data);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

const create = async (req, res) => {
    try {
        if (!req.role.includes('Admin')) {
            res.status(403).send({ message: "Vous n'avez pas les droits nécessaires pour créer un utilisateur." });
            return;
        }

        const response = await userService.create(req.body);
        await res.status(response.status).send(response.data);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

const update = async (req, res) => {
    try {
        if (!req.role.includes('Admin') && req.userId !== parseInt(req.query.id)) {
            res.status(403).send({ message: "Vous n'avez pas les droits nécessaires pour modifier cet utilisateur." });
            return;
        }

        const response = await userService.update(req.params.id, req.body);
        await res.status(response.status).send(response.data);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

const del = async (req, res) => { // 'delete' is not allowed as variable name
    try {
        if (!req.role.includes('Admin') && req.userId !== parseInt(req.query.id)) {
            res.status(403).send({ message: "Vous n'avez pas les droits nécessaires pour supprimer cet utilisateur." });
            return;
        }
        const response = await userService.del(req.params.id);
        await res.status(response.status).send(response.data);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

const getTickets = async(req, res) => {
    try {
        if (!req.role.includes('Admin') && req.userId !== parseInt(req.query.id)) {
            res.status(403).send({ message: "Vous n'avez pas les droits nécessaires pour accéder aux tickets de cet utilisateur." });
            return;
        }

        const response = await userService.getTickets(req.query.id);
        await res.status(response.status).send(response.data);
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: e.message });
    }
};

module.exports = {
    getCount,
    findAll,
    findOne,
    create,
    update,
    del,
    getTickets,
    findPerPage,
}