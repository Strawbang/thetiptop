import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from 'react-router-dom';
import TicketCheck from "./index";
import { Provider } from 'react-redux';
import Store from '../Redux/reduxStore';
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

describe("<TicketCheck/> component", () => {
    describe("renders well", () => {
        it("Ticket number field exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <TicketCheck />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.ticket-check');
            let ticketNumberInput = form.querySelector('.field.ticket input[name="number"]');

            expect(ticketNumberInput).to.exist;
        })
        it("Submit button exists", () => {
            act ( () => {
                ReactDOM.render(
                    <Provider store={Store}>
                        <MemoryRouter>
                            <TicketCheck />
                        </MemoryRouter>
                    </Provider>,
                    rootContainer);            
            })

            let form = document.querySelector('form.ticket-check');
            let submitButton = form.querySelector('button');
            
            expect(submitButton).to.exist;
            expect(submitButton.innerHTML).to.equal('Envoyer');
        })
    })
})