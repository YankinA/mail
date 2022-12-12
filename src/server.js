const { access } = require('fs');
const http = require('http');
const db = require('./db.json');

const conf = {
  host: "localhost",
  port: 3000,
};

const reqListener = (req, res) => {
  //res.writeHead(200, { 'Content-Type': 'application/json' });
 // res.end(JSON.stringify(db), 'utf-8');
}

const server = http.createServer(reqListener);

server.listen(conf.port, conf.host, () => {
  console.log(`Server is running on http://${conf.host}:${conf.port}`);
});


class Orm {

  /**
   * 
   * @param {object[]} db 
   * @param {number} limit 
   * @param {number} offset 
   */
  constructor(db, limit, offset) {
    this.db = db;
    this.limit = limit; 
    this.offset = offset;

  }
  /**
   * 
   * @param {{[string]: string | number }} query 
   * @returns {object[]}
   */
  findBy(query) {
    const keys = Object.keys(query);
    const finded = []
    while(this.offset < this.db.length) {
      const select = this.db[this.offset];
      this.offset++;
      if (keys.every(key => query[key] === select[key]))  {
        finded.push(select);
      }

      if (finded.length >= this.limit) {
        break;
      }
    }
    return finded;
  }
}

const orm = new Orm(db, 10, 0);


const res = orm.findBy({folder: "Архив"})
console.log(res.length);

