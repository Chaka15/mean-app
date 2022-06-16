const http = require('http');
const { env } = require('process');
const app = require('./backend/app');

const port = server.listen(env.PORT || 3000);

app.set('port', port);
const server = http.createServer(app);
server.listen(port);

