const pool = require("../db/Sql");

const getcountries = async (req, res) => {
  try {
    const [result, field] = await pool.execute(" SELECT * FROM  countries");

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getsates = async (req, res) => {
  try {
    const [result, field] = await pool.execute(" SELECT * FROM  states");

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getcities = async (req, res) => {
  try {
    const [result, field] = await pool.execute(" SELECT * FROM  cities");

    return result;
  } catch (error) {
    console.log(error);
  }
};




module.exports = { getcountries, getsates, getcities };