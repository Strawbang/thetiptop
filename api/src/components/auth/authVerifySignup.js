const db = require('../../config/models/modelAssociation');
const User = db.users;
const Role = db.roles;

const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.user.email,
        },
    }).then((user) => {
        if (user) {
            res.status(400).send({
                status: 'email_already_used',
                message: 'L\'email fourni est déjà utilisé.',
                successful: false,
            });
            return;
        }

        next();
    });
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i += 1) {
            if (!Role.findOne(req.body.roles[`${i}`])) {
                res.status(400).send({
                    message: `Failed! Role does not exist ${req.body.roles[`${i}`]}`,
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted,
};

module.exports = verifySignUp;
