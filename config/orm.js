var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) { arr.push("?"); }
  return arr.toString();
}

function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) value = `'${value}'`;
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}


var orm = {

  all: function(tableInput, cb) {
    connection.query(`SELECT * FROM ${tableInput}`, function(err, result) {
      if (err) throw err; cb(result);
    });
  },

  create: function(table, cols, vals, cb) {
    connection.query(`INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`, vals, function(err, result) {
      if (err) throw err; cb(result);
    });
  },

  update: function(table, objColVals, condition, cb) {
    connection.query(`UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`, function(err, result) {
      if (err) throw err; cb(result);
    });
  },

  delete: function(table, condition, cb) {
    connection.query(`DELETE FROM ${table} WHERE ${condition}`, function(err, result) {
      if (err) throw err; cb(result);
    });
  }

};

module.exports = orm;
