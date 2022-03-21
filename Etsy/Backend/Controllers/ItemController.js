var connection = require("../dbConnection.js");

exports.getAllItems = async (req) => {
  let result = await connection.getConnection(async function (err, conn) {
    result1 = await conn.query("SELECT * from itemdetails");
    conn.release();
    return result1;
  });
  return result;
};
exports.getSearchedItems = async (req) => {
  let result = await connection.getConnection(async function (err, conn) {
    result1 = await conn.query("SELECT * FROM itemdetails WHERE ItemName LIKE '%"+ (req.query.searchWord)+"%';");
    conn.release();
    return result1;
  });
  return result;
};

exports.getFavouriteItems = async (req) => {
  let result1 = await connection.getConnection(async function (err, conn) {
    result = await conn.query("SELECT ItemId FROM favourites WHERE ProfileId = " + req.body.ProfileId);
    conn.release();
    return result1;
  });
  return result;
};
