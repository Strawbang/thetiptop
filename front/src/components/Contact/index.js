import './index.css';
import { Button } from 'react-bootstrap';
import React, { useState } from "react";

const Contact = (props) => {
    const [status, setStatus] = useState("Envoyer");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Envoi en cours...");
        const { name, email, subject, message } = e.target.elements;
        let details = {
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
        };
        let response = await fetch("http://localhost:8080/api/contact", {
            method: "POST",
            headers: {
            "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(details),
        });
        setStatus("Envoyer");
        let result = await response.json();
        if (result.successful == true) {
            alert("Merci de nous avoir contacté, nous reviendrons vers vous au plus vite !");
        } else  {
            alert("Une erreur est survenue, veuillez réessayer plus tard");
        }
    };
    return (
        <div className="boxContact" style={{backgroundImage:`url(${props.image})`}}>
            <div className="frameContact">
                <div className="titleFrameContact">
                    <h1 className="titleContact">Contactez nous</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nom:</label>
                        <input type="text" id="name" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" required />
                    </div>
                    <div>
                        <label htmlFor="subject">Sujet:</label>
                        <input id="subject" required />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" required />
                    </div>
                    <Button variant="dark" size="lg" type="submit">{status}</Button>
                </form>
            </div>
        </div>
    );
};

export default Contact;