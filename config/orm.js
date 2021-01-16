const { connect } = require("./connection");
const connection = require("./connection");

const createPlaceHolders = (quantity) => {
  let arr = [];

  for (let i = 0; i < quantity.length; i++) {
    arr.push("?");
  }
  return arr.toString();
};

const obj2sql = (obj) => {
  let arr = [];
  for (var key in obj) {
    let value = obj[key];
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = `'${value}'`;
      }
      arr.push(`${key}=${value}`);
    }
  }
  return arr.toString();
};

const orm = {
  all: (tableInput, cb) => {
    let queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  create: (table, cols, vals, cb) => {
    let queryString = `INSERT INTO ${table}(${cols.toString()}) VALUES (${createPlaceHolders(
      vals.length
    )})`;

    console.log(queryString);

    connection.query(queryString, vals, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  update: (table, objColVals, condition, cb) => {
    let queryString = `UPDATE ${table} SET ${obj2sql(
      objColVals
    )} WHERE ${condition}`;

    console.log(queryString);

    connection.query(queryString, (err, res) => {
      if (err) throw err;
      cb(result);
    });
  },
  delete: (table, condition, cb) => {
    let queryString = `DELETE FROM ${table} WHERE ${condition}`;

    console.log(queryString);

    connection.query(queryString, (err, result) => {
      if (err) throw err;

      cb(result);
    });
  },
};

module.exports = orm;