const path = require('path');
const fs = require('fs');
const http = require('http');
const db = require('../db.json');


/**
 * Simle orm for db.json
 */
class Orm {

  /**
   * @param {object[]} db 
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * find by query parameters
   * @param {{ [key: string]: string | number }} query
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<{ offset: number, limit: number, findedRows: object[] | [] }>}
   */
  async findBy(query, offset = 0, limit = 10) {

    const findedRows = []

    while (offset < this.db.length && findedRows.length < limit) {
      const tableRow = this.db[offset];
      offset++;

      if (this.where(tableRow, query)) {
        findedRows.push(tableRow);
      }
    }
    return { offset, limit, findedRows };
  }

  /**
   * checks if a table row contains query parameters
   * @param {{[string]: string | number }} tableRow
   * @param {{ [key: string]: string | number }} query 
   * @returns {boolean}
  */
  where(tableRow, query) {
    const columnNames = Object.keys(query);
    return columnNames.every(columnName => query[columnName] === tableRow[columnName]);
  }
}

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const sendStatic = (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  const file = req.url === '/' ? 'index.html' : req.url;
  const ext = path.extname(file).substring(1);
  const mimeType = MIME_TYPES[ext];

  try {
    res.writeHead(200, { 'Content-Type': mimeType });
    const filePath = path.join(__dirname, file);
    fs.createReadStream(filePath).pipe(res);

  } catch (error) {
    res.statusCode = 404;
    res.end('Page not found');
  }
}
 
const orm = new Orm(db);

const router = async (req, res) => {
  if (req.url === '/' || req.url.includes('assets')) {
    sendStatic(req, res);
  } else if (req.url.includes('mails')) {

    const mails = await orm.findBy({ folder: undefined });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mails), 'utf-8');
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }

 
}

const conf = {
  host: "localhost",
  port: 3000,
};

const server = http.createServer(router);

server.listen(conf.port, conf.host, () => {
  console.log(`Server is running on http://${conf.host}:${conf.port}`);
});



