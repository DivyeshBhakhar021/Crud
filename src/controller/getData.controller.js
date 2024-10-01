const { getdata } = require("../modal");

const getcountriesdata = async (req, res) => {
  try {
    const countriesdata = await getdata.getcountries();

    res.status(200).json({
      success: true,
      message: "countriesdata fond",
      data: countriesdata,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "countriesdata not fond",
      data: "Internal server error" + error.message,
    });
  }
};

const getstatedata = async (req, res) => {
  try {
    const statedata = await getdata.getsates();

    res.status(200).json({
      success: true,
      message: "statedata fond",
      data: statedata,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "statedata not fond",
      data: "Internal server error" + error.message,
    });
  }
};


const getcitiessdata = async (req, res) => {
  try {
    const citiesdata = await getdata.getcities();

    res.status(200).json({
      success: true,
      message: "citiesdata fond",
      data: citiesdata,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "citiesdata not fond",
      data: "Internal server error" + error.message,
    });
  }
};


module.exports = { getcountriesdata, getstatedata, getcitiessdata };
