const app = require('./app');
const http = require('http');

const port = process.env.PORT || 8080;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})

module.exports = httpServer