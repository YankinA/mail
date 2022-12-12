const http = require('http');
const db = require('./db.json');

const conf = {
  host: "localhost",
  port: 3000,
};

const fisrt = db[3];
console.log(fisrt);


const reqListener = (req, res) => {
  //res.writeHead(200, { 'Content-Type': 'application/json' });
 // res.end(JSON.stringify(db), 'utf-8');
}

const server = http.createServer(reqListener);

server.listen(conf.port, conf.host, () => {
  console.log(`Server is running on http://${conf.host}:${conf.port}`);
});
