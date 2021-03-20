const connection = require("./connection");

// helper function for sql syntax
function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// helper function to convert object key/value pairs to sql syntax
function objToSQL(obj) {
  let arr = [];

  // loop through the keys and push the key/value as an arr of strings
  for (let key in obj) {
    let val = obj[key];

    // check to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key)) {
      // if it's a string with spaces, add quotes
      if (typeof val === "string" && val.indexOf(" ") >= 0) {
        val = `'${val}'`;
      }
      arr.push(`${key}=${val}`);
    }
  }
  return arr.toString();
}

// creating all of our sql statement functions
const orm = {
  all: (tableInput, cb) => {
    let queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
  create: (table, cols, vals, cb) => {
    let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(
      vals.length
    )}))`;
    console.log(queryString);

    connection.query(queryString, vals, (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  update: (table, objColVals, condition, cb) => {
    let queryString = `UPDATE ${table} SET ${objToSQL(
      objColVals
    )} WHERE ${condition};`;
    console.log(queryString);

    connection.query(queryString, (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  delete: (table, condition, cb) => {
    let queryString = `DELETE FROM ${table} WHERE ${condition}`;
    console.log(queryString);

    connection.query(queryString, function (err, res) {
      if (err) throw err;
      cb(res);
    });
  },
};

//  orm object exports to  model
module.exports = orm;
