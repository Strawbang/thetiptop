import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from '../Redux/reduxStore';
import Signup from "./index";
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

describe("<Signup/> component", () => {
    describe("renders well", () => {
        it("firstname field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })
            
            let form = document.querySelector('form.signup');
            let firstnameField = form.querySelector('input[name="firstname"]');

            expect(firstnameField).to.exist;
        })
        it("lastname field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let lastnameField = form.querySelector('input[name="lastname"]');

            expect(lastnameField).to.exist;
        })
        it("birthdate field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let birthdateField = form.querySelector('input[name="birthdate"]');

            expect(birthdateField).to.exist;
        })
        it("email field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let emailField = form.querySelector('input[name="email"]');

            expect(emailField).to.exist;
        })
        it("address field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let addressField = form.querySelector('input[name="address"]');

            expect(addressField).to.exist;
        })
        it("postcode field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let postcodeField = form.querySelector('input[name="postcode"]');

            expect(postcodeField).to.exist;
        })
        it("city field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let cityField = form.querySelector('input[name="city"]');

            expect(cityField).to.exist;
        })
        it("password field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let passwordField = form.querySelector('input[name="password"]');

            expect(passwordField).to.exist;
        })
        it("confirm-password field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let confirmPasswordField = form.querySelector('input[name="confirm-password"]');

            expect(confirmPasswordField).to.exist;
        })
        it("newsletter field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let newsletterField = form.querySelector('input[name="newsletter"]');

            expect(newsletterField).to.exist;
        })
        it("cgu field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let cguField = form.querySelector('input[name="cgu-rules"]');

            expect(cguField).to.exist;
        })
        it("submit button exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signup />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.signup');
            let submitButton = form.querySelector('button[type="submit"]');

            expect(submitButton).to.exist;
        })
    })
})