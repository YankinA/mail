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

const _trslateCategory = {
  'Регистрации': 'registrations',
  'Заказы': 'orders',
  'Билеты': 'tickets',
  'Путешевствия': 'trips',
  'Штрафы и налоги': 'finesAndTaxes',
  'Финансы': 'finance',
}

const createUniqId = (date = null) => {
  const strDate = (date ? new Date(date) : new Date()).getTime().toString(36);
  return 'ID' + strDate + Math.random().toString(36).slice(2, 6);
}

db = db.filter(mail => mail).map((mail, index) => {
  mail.id = createUniqId(mail.date);

  mail.folder = mail.folder in _trslateFolder ? _trslateFolder[mail.folder] : 'inbox';
  if ('flag' in mail && mail.flag in _trslateCategory) {
    mail.flag = _trslateCategory[mail.flag];
  }
  return mail;
});

db.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


db = db.reduce((acc, mail) => {
  if (mail.folder in acc) {
    acc[mail.folder].push(mail);
  } else {
    acc[mail.folder] = [mail];
  }

  return acc;
}, {})


const PORT = 3000;

const dev = process.argv.includes('dev');
const DIR = dev ? '/dist' : '';

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
};

const corsHeaders = { 
  'Access-Control-Allow-Origin': '*', 
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': true,
}

/**
 * Simle orm for db.json
 */
class Orm {

  /**
   * @param {object[]} db 
   */
  constructor(db) {
    //db = db;
    this.offset = 0;
  }

  /**
   * add row to database table
   * @param {object} data - line data
   * @returns {boolean}
   */
  insert(data) {
    if (data.folder in db) {
      data.date = new Date().toString();
      data.id = createUniqId();
      db[data.folder].unshift(data);
      return db[data.folder][0];
    }
    return false;
  }

  /**
   * find by query parameters
   * @param {{ [key: string]: string | number }} query
   * @param {number} offset
   * @param {number} limit
   * @returns {Promise<{ offset: number, limit: number, result: object[] | [] }>}
   */
  async findBy(query, offset = 0, limit = 30) {
    this.offset = offset;

    const result = []
    while (result.length < limit && this.offset < db[query.folder].length) {

      if (db[query.folder].length <= this.offset) {
        break;
      }
      const select = db[query.folder][this.offset];
      this.offset++;
      if (this.where(select, query)) {
        result.push(select);
      }
    }
    return { offset: this.offset, limit, result };
  }

  /**
   * checks if a select contains query parameters
   * @param {{[string]: string | number }} select
   * @param {{ [key: string]: string | number }} query 
   * @returns {boolean}
  */
  where(select, query) {
    const collNames = Object.keys(query);

    return collNames.every(coll => {
      if (query[coll] === true && select[coll]) {
        return true;
      }

      return query[coll] === select[coll];
    });
  }
};

const orm = new Orm(db);

const statFileController = async (req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url;
  const ext = path.extname(file).substring(1);



  const mimeType = MIME_TYPES[ext];

  res.writeHead(200, { 'Content-Type': mimeType, ...corsHeaders });
  const filePath = path.join(__dirname, DIR, file);
  fs.createReadStream(filePath).pipe(res);
}

const mailsController = async (req, res) => {


  const getMils = async () => {
    const parsedUrl = url.parse(req.url);

    const query = querystring.parse(parsedUrl.query);

    const offset = query.offset ?? 0;
    delete query.offset;

    // string to types
    for (const key in query) {

      const value = query[key];

      if (value === 'true' || value === 'false') {
        query[key] = Boolean(value);
        continue;
      }

      if (!isNaN(Number(value)) && typeof Number(value) === 'number') {
        query[key] = Number(value);
        continue;
      }
    }

    const mails = await orm.findBy(query, offset);
    res.writeHead(200, { 'Content-Type': 'application/json', ...corsHeaders});
    res.end(JSON.stringify(mails), 'utf-8');
  }

  const addMail = async () => {
       let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end',async () => {
           const parsed = JSON.parse(body);
           const isOk = await orm.insert(parsed);
        });
   res.statusCode = 200;
   res.end('mail added');
  }

  const methods = {
    GET: async () => {
      await getMils();
    },
    POST: async () => {
      addMail();
    },
    OPTIONS: async () => {

      res.writeHead(200, corsHeaders);
      //'Access-Control-Allow-Origin':'*'
      res.end('mail added');
    }
  };

  if (req.method in  methods) {
    await methods[req.method]();
  }
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



