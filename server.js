const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
let db = require('./db.json');

const _trslateFolder = {
  undefined: 'inbox',
  'Важное': 'important',
  'Отправленные': 'sent',
  'Черновики': 'draft',
  'Архив': 'archive',
  'Спам': 'spam',
  'Корзина': 'trash',
}

db = db.map((mail) => {
  mail.folder = _trslateFolder[mail.folder];
  return mail;
});

db.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


const PORT = 3000;

const dev = process.argv.includes('dev');
const DIR = dev ? '/dist' : '';

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  svg: 'image/svg+xml',
};

/**
 * Simle orm for db.json
 */
class Orm {

  /**
   * @param {object[]} db 
   */
  constructor(db) {
    this.db = db;
    this.offset = 0;
  }

  /**
   * find by query parameters
   * @param {{ [key: string]: string | number }} query
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<{ offset: number, limit: number, result: object[] | [] }>}
   */
  async findBy(query, offset = 0, limit = 30) {
    this.offset = offset === 0 ? offset : this.offset;

    const result = []
    while (result.length < limit && this.offset < this.db.length) {
      const select = this.db[this.offset];
      this.offset++;

      if (this.where(select, query)) {
        result.push(select);
      }
    }
    return { offset: result.length + offset, limit, result };
  }

  /**
   * checks if a select contains query parameters
   * @param {{[string]: string | number }} select
   * @param {{ [key: string]: string | number }} query 
   * @returns {boolean}
  */
  where(select, query) {
    const collNames = Object.keys(query);
    return collNames.every(coll => query[coll] === select[coll]);
  }
};

const orm = new Orm(db);

const statFileController = async (req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url;
  const ext = path.extname(file).substring(1);
  const mimeType = MIME_TYPES[ext];

  res.writeHead(200, { 'Content-Type': mimeType });
  const filePath = path.join(__dirname, DIR, file);
  fs.createReadStream(filePath).pipe(res);
}

const mailsController = async (req, res) => {
  const parsedUrl = url.parse(req.url);

  const query = querystring.parse(parsedUrl.query);

  const offset = query.offset ?? 0;
  delete query.offset;

  const mails = await orm.findBy(query, offset);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(mails), 'utf-8');
}

const router = async (req, res) => {
  const stateMachine = {
    '': async () => {
      await statFileController(req, res);
    },
    'assets': async () => {
      await statFileController(req, res);
    },
    'api': async (parsedPath) => {
      const controllerName = parsedPath[3];
      if (controllerName.includes('mails?') || controllerName === "mails") {
        await mailsController(req, res);
      } else {
        stateMachine.default();
      }

    },
    default: () => {
      res.statusCode = 404;
      res.end('Page not found');
    }
  }

  const parsedPath = req.url.split("/");
  const key = parsedPath[1];
  await key in stateMachine ? stateMachine[key](parsedPath) : stateMachine.default();
}

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



