var connection = require("../dbConnection.js");

exports.checkShopName = async (req) => {
  let result = await connection.getConnection(async function (err, conn) {
    result1 = await conn.query(
      "SELECT EXISTS(SELECT * from shopdetails WHERE ShopName=" +
        (req.query.nameToCheck) +
        ");"
    );
    conn.release();
    return result1;
  });
  return result;
};
