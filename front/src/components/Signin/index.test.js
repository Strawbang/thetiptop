import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from '../Redux/reduxStore';
import Signin from "./index";
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

describe("<Signin/> component", () => {
    describe("renders well", () => {
        it("username/email field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signin />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let frame = document.querySelector('.frameSignIn');
            let usernameField = frame.querySelector('input[name="email"]');

            expect(usernameField).to.exist;
        })
        it("password field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signin />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let frame = document.querySelector('.frameSignIn');
            let passwordField = frame.querySelector('input[name="password"]');

            expect(passwordField).to.exist;
        })
        it("login button exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signin />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let frame = document.querySelector('.frameSignIn');
            let loginButton = frame.querySelector('button.Login');

            expect(loginButton).to.exist;
        })
        it("Google auth button exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signin />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let frame = document.querySelector('.frameSignIn');
            let googleAuthButton = frame.querySelector('button.frameGoogleSignIn');

            expect(googleAuthButton).to.exist;
        })
        it("Facebook auth button exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <Signin />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let frame = document.querySelector('.frameSignIn');
            let facebookAuthButton = frame.querySelector('button.frameFacebookSignIn');

            expect(facebookAuthButton).to.exist;
        })
    })
})