import React from "react";
import ReactDOM from "react-dom";
import Profil from '../Profil/index';
import { act } from "react-dom/test-utils";
import { MemoryRouter } from 'react-router-dom';

const { expect } = require('chai');
const chai = require('chai');
var jsdom = require("mocha-jsdom");
const url = "http://localhost:3000/";

global.document = jsdom({
  url: url,
  skipWindowCheck: true,
});

let rootContainer;

beforeEach( () => {
    rootContainer = document.createElement("div");
    document.body.appendChild(rootContainer);
})

afterEach( () => {
    document.body.removeChild(rootContainer);
    rootContainer = null;
})

describe("<ProfilDetail/> component", () => {
    describe("renders well", () => {
        it("firstname field exists", (done) => {
            act ( () => {
                ReactDOM.render(
                    <MemoryRouter>
                        <Profil />
                    </MemoryRouter>,
                    rootContainer);
            })

            let form = document.querySelector('.boxProfilForm');
            let firstnameField = form.querySelector('input[name="firstname"]');
            
            expect(firstnameField).to.exist;
            done();
        })
        it("lastname field exists", (done) => {
            act ( () => {
                ReactDOM.render(
                    <MemoryRouter>
                        <Profil />
                    </MemoryRouter>,
                    rootContainer);
            })

            let form = document.querySelector('.boxProfilForm');
            let lastnameField = form.querySelector('input[name="lastname"]');
            
            expect(lastnameField).to.exist;
            done();
        })
        it("email field exists", (done) => {
            act ( () => {
                ReactDOM.render(
                    <MemoryRouter>
                        <Profil />
                    </MemoryRouter>,
                    rootContainer);
            })

            let form = document.querySelector('.boxProfilForm');
            let emailField = form.querySelector('input[name="email"]');
            
            expect(emailField).to.exist;
            done();
        })
        it("birthdate field exists", (done) => {
            act ( () => {
                ReactDOM.render(
                    <MemoryRouter>
                        <Profil />
                    </MemoryRouter>,
                    rootContainer);
            })

            let form = document.querySelector('.boxProfilForm');
            let birthdateField = form.querySelector('input[type="date"]');
            
            expect(birthdateField).to.exist;
            done();
        })
        it("submit button exists", (done) => {
            act ( () => {
                ReactDOM.render(
                    <MemoryRouter>
                        <Profil />
                    </MemoryRouter>,
                    rootContainer);
            })

            let form = document.querySelector('.boxProfilForm');
            let submitButton = form.querySelector('button[type="submit"]');
            
            expect(submitButton).to.exist;
            done();
        })
    })  
})
