const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: `${ process.env.EMAIL_ADDRESS }`,
      pass: `${ process.env.EMAIL_PASSWORD }`,
    },
});

const sendConfirmationEmail = async (user, token) => {
    const mailOptions = {
        from: `${ process.env.EMAIL_ADDRESS }`,
        to: user.email,
        subject: "Confirmation de votre adresse email - Thé Tip Top",
        text:
        `Bonjour,\n\n
        Vous recevez cet email car vous venez de créer un compte sur le site du jeu-concours Thé Tip Top. Cependant, pour nous assurer que vous êtes une personne réelle, nous avons besoin que vous confirmiez votre compte.\n\n
        Pour ce faire, veuillez cliquer sur le lien suivant: ${process.env.BASE_URL}/confirmation?token=${token}.\n\n
        Merci de votre compréhension.\n\n
        L'équipe Thé Tip Top.
        `,
    };

    return new Promise((resolve) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};

const sendWelcomeMail = async (user) => {
    const mailOptions = {
        from: `${ process.env.EMAIL_ADDRESS }`,
        to: user.email,
        subject: "Activation de votre compte - Thé Tip Top",
        text:
        `Bonjour et bienvenue sur le site du jeu-concours Thé Tip Top.\n\n
        Votre compte a été activé avec succès. Dès à présent, et ceci jusqu'au 16 novembre, vous pouvez utiliser les tickets que vous possédez afin de tenter votre chance à la roulette et remporter l'un des lots proposés.\n\n
        N'oubliez pas non plus qu'à l'issue du jeu-concours, soit le 16 novembre, un tirage au sort sera effectué parmi tous les participants  afin de déterminer le gagnant d'un an de thé d'une valeur de 360 €.\n\n
        A bientôt sur le site du jeu-concours Thé Tip Top.\n\n
        L'équipe Thé Tip Top.
        `,
    };

    return new Promise((resolve) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};

const sendContactMail = async (data) => {
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: process.env.EMAIL_ADDRESS,
        subject: "Nouvelle soumission du formulaire de contact - Thé Tip Top",
        text:
        `Bonjour,\n\n
        Un utilisateur vient d'utiliser le formulaire de contact. Ci-dessous, les informations:\n\n
        Nom: ${ data.name }\n\n
        Email: ${ data.email }\n\n
        Sujet: ${ data.subject }\n\n
        Message: ${ data.message }\n\n
        `,
    };

    const promise = new Promise((resolve) => {
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                resolve({
                        status: 400,
                        data: {
                            error: error,
                            message: "Une erreur inattendue est survenue.",
                            successful: false,
                        },
                    });
            }
            else {
                resolve({
                    status: 200,
                    data: {
                        message: "Un mail de contact a été envoyé.",
                        successful: true,
                    },
                });
            }
        });
    });

    return promise;
};

module.exports = {
    sendConfirmationEmail,
    sendWelcomeMail,
    sendContactMail,
};
