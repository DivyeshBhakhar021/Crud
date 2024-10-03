const pool = require("../db/Sql");

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const createUser = async (email, password) => {
    console.log(email,password,"cccccc");
    
  const [result] = await pool.execute(
    "INSERT INTO user (email, password) VALUES (?, ?)",
    [email, password]
  );
  return result.insertId;
};

const findUserById_id = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
};

const updateUserRefreshToken = async (id, refreshtoken) => {
    console.log(id,refreshtoken,"FAS");

      const tokenValue = refreshtoken === undefined ? null : refreshtoken;

         const [result] = await pool.execute(
           "UPDATE user SET refreshtoken = ? WHERE id = ?",
           [tokenValue, id]
         );
         console.log(result, "FD cwg");
    
    

  
  
//   return {};
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById_id,
  updateUserRefreshToken,
};
