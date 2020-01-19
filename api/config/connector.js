const { Pool } =require('pg');

class DbConnector {
  constructor() {
    //var self =this
    const pool = new Pool({
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      ssl: true,
      min: process.env.DB_POOLMIN,
      max: process.env.DB_POOLMAX,
      idleTimeoutMillis: process.env.DB_IDLETIMEOUT,
      connectionTimeoutMillis: process.env.DB_CONNTIMEOUT
    });

    pool.on('error', (err, client) => {
      console.log('error', 'unxpected error occured', err);
    });

    this.pool = pool;

    pool.connect((err, client, done) => {
      if (err) {
        console.log('error connecting to database', err);
      }

      this.client = client;
      this.pgDone = done;
      this.client = client;
    });
  }
  //query to fetch all record
  fetchAll(sql) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  Query(sql, params) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = DbConnector;
