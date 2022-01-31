import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from 'react-router-dom';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { CookiesProvider } from 'react-cookie';
// import ScrollToTop from '../ScrollToTop';
import { Provider } from 'react-redux';
import Store from '../components/Redux/reduxStore';
import App from '../components/App';
import compression from 'compression';
import minify from 'express-minify';
import http from 'http';

const app = express(); // create express app

// add middlewares
app.use(compression());
app.use(minify());
app.use(express.static('./build'));

//Test
app.get("/*", (req, res, next) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={Store}>
        <CookiesProvider>
            {/* <ScrollToTop/> */}
            <App />
        </CookiesProvider>
      </Provider>
    </StaticRouter>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    if (context.status === 404) {
      res.status(404);
    }
    if (context.url) {
      return res.redirect(301, context.url);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

const httpServer = http.createServer(app);

httpServer.listen(process.env.REACT_APP_PORT || 3000, () => {
	console.log(`HTTP Server running on port ${process.env.REACT_APP_PORT}`);
});