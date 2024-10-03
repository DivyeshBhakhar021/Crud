var jwt = require("jsonwebtoken");
const { findUserByEmail,createUser,findUserById_id,updateUserRefreshToken, } = require("../modal/user.modal");
const bcrypt = require("bcrypt");


const generateAcc_Reftoken = async (id) => {
  try {
    const user = await findUserById_id(id);
    const accesstoken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "accesstoken123",
      { expiresIn: 60 * 60 * 60}
    );

    const refreshtoken = jwt.sign({ id: user.id }, "refreshtoken123", {
      expiresIn: "1d",
    });

    user.refreshtoken = refreshtoken;
    // await user.save({ validateBeforeSave: false });
    return { accesstoken, refreshtoken };
  } catch (error) {
    throw error;
  }
};

const register = async (req,res) => {
    console.log(req.body,"register");
    
    try {
        const { email , password} = req.body;
        const verifyEmail = await findUserByEmail(email);

        if (verifyEmail) {
            return res.status(409).json({
                success:false,
                message:"Email Alreday Exists"
            })
        }

        const hashPasseord = await bcrypt.hash(password,10)
        console.log(hashPasseord,"oass");
        

        const user = await createUser(email, hashPasseord);

        console.log(user,"adg");
        
     
        return res.status(201).json({
            success:true,
            message:"Registration succesfully",
            data:user
        })
        
    } catch (error) {
       res.status(500).json({
         success: false,
         message: "Internal server error: " + error.message,
       });
    }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    console.log(user,"aaa");
    

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(404).json({
        success: false,
        message: "Password is incorrect.",
      });
    }

    const { accesstoken, refreshtoken } = await generateAcc_Reftoken(user.id);
    console.log("accesstoken!!!!!!!!!!!1", accesstoken);
    console.log("refreshtoken!!!!!!!!!!!!", refreshtoken);

     const userdataF = await findUserById_id(user.id);


     console.log(userdataF,"SAds");
     

       const optionaccrestoken = {
         httpOnly: true,
         secure: true,
         maxAge: 60 * 60 * 1000,
       };

       const optionrefretoken = {
         httpOnly: true,
         secure: true,
         maxAge: 60 * 60 * 24 * 10 * 1000,
       };

       const setdata = updateUserRefreshToken(userdataF.id,refreshtoken)
       console.log(setdata,"DSACF");
       

    res
      .status(200)
      .cookie("accesstoken", accesstoken, optionaccrestoken)
      .cookie("refreshtoken", refreshtoken, optionrefretoken)
      .json({
        success: true,
        message: "Successfully logged in.",
        data: userdataF,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const logout = async (req,res) => {
    console.log(req.body.id,"d");
    
try {
    const user = await updateUserRefreshToken(req.body.id);
    console.log(user,"fdwe");

    res.status(200).clearCookie("accrestoken").clearCookie("refretoken").json({
      success: true,
      message: "User logged out successfully.",
    });
    
} catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  
}
}


const chekhlogin = async (req, res) => {
  try {
    // console.log("aaaaaaaaa", req.headers['cookie']);
    console.log("asda", req);
    

       const cookieHeader = req.headers['cookie'];

    if (!cookieHeader) {
      return res.status(401).json({
        success: false,
        message: "Token Invalied",
      });
    }

    const cookies = cookieHeader.split(";").reduce((acc, current) => {
      const [key, value] = current.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});
console.log("sdf");

    console.log(cookies.accesstoken);


    if (!cookies.accesstoken) {
      return res.status(401).json({
        success: false,
        message: "Token Invalied",
      });
    }



    const chek = await jwt.verify(cookies.accesstoken, "accesstoken123");

    console.log("chek", chek);

    if (!chek) {
      return res.status(400).json({
        success: false,
        message: "Token Invalied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User  Authenticated",
      data: chek,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

module.exports = { generateAcc_Reftoken, register, login, logout, chekhlogin };