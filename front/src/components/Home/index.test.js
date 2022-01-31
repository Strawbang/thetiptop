import React from "react";
import ReactDOM from "react-dom";
import Home from './index';
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

describe("<Home/> component", () => {
    describe("renders well", () => {
        // context("", () => {})
        it("participate button exists", (done) => {
            act ( () => {
                ReactDOM.render(
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>,
                    rootContainer);
            })

            let participateButton = document.querySelector('.carouselItems .carouselButton');
            
            expect(participateButton).to.exist;
            expect(participateButton.innerHTML).to.equal('Participer');
            expect(participateButton.closest('a').href).to.equal(url + 'participate');

            done();
        })

        it("how-to-particate button exists", (done) => {
            act ( () => {
                ReactDOM.render(
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>,
                    rootContainer);
            })

            let howToParticipateButton = document.querySelector('.carouselItems .buttonHow');

            expect(howToParticipateButton).to.exist;
            expect(howToParticipateButton.innerHTML).to.equal('Comment participer ?');
            expect(howToParticipateButton.closest('a').href).to.equal(url + 'rules');
            done();
        })
    })
    
})
