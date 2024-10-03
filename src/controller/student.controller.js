const path = require("path");
const { studentmodal } = require("../modal");
const fileupload = require("../utilse/cloudinary");
const bcrypt = require("bcrypt");
const { log } = require("console");


// const register =


const get_student_data = async (req,res) => {
try {
    
    const studentdata = await studentmodal.getstudent();


    res.status(200).json({
      success: true,
      message: "studentdata fond",
      data: studentdata
    });
    
} catch (error) {
    res.status(500).json({
        success: true,
        message: "studentdata not fond",
        data: 'Internal server error' + error.message
      })
    
}
}

const add_studentdata = async (req, res) => {
  // console.log(req.body.file,"aaaaaaaaaaaaaaaaaaaaaaaa");
  
  try {
    let fileData = {};
    if (req.file) {
      const fileres = await fileupload(req.file.path);

      fileData = {
        public_id: fileres.public_id,
        url: fileres.url,
        display_name: fileres.display_name,
      };
    } 
    // else if (req.body.file) {
    //   const fileres = await fileupload(req.body.file);

    //   fileData = {
    //     public_id: fileres.public_id,
    //     url: fileres.url,
    //     display_name: fileres.display_name,
    //   };
    // }

    const {
      first_name,
      last_name,
      email,
      gender,
      hobbies,
      country,
      state,
      city,
      password,
    } = req.body;

      const hobbiesArray = Array.isArray(hobbies)
        ? hobbies
        : hobbies
        ? hobbies.split(",")
        : [];
 

    const studentData = await studentmodal.addstudent(
      first_name,
      last_name,
      email,
      gender,
      hobbiesArray.join(","),
      country,
      state,
      city,
      fileData,
      password
    );

    console.log("Student data saved:", studentData);

    res.status(201).json({
      success: true,
      message: "Student data added successfully",
      data: studentData,
    });
  } catch (error) {
    console.error("Error while adding student data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


const delete_Student = async (req, res) => {
    try {
      const { student_id } = req.params;
      const student_delete = await studentmodal.deleteStudent(student_id);
      // console.log(salespeople);
  
      res.status(200).json({
        success: true,
        data: student_delete,
        message: 'student_delete delete successfully.'
      })
    } catch (error) {
      res.status(500).json({
        success: true,
        message: 'Internal server error.'
      })
    }
}
  

const update_student = async (req, res) => {
  // console.log("Update Request", req.body.hobbies);

  try {
    const { student_id } = req.params;
    const {
      first_name,
      last_name,
      email,
      gender,
      country,
      state,
      city,
    } = req.body;

    let updateData = {
      first_name,
      last_name,
      email,
      gender,
      country,
      state,
      city,
    };

    if (req.file) {
      console.log("New File upload");
      const fileres = await fileupload(req.file.path);

      updateData.file = {
        public_id: fileres.public_id,
        url: fileres.url, 
        display_name: fileres.display_name,
      };
    }

   updateData.hobbies = Array.isArray(req.body.hobbies)
     ? req.body.hobbies
     : req.body.hobbies.join(",")



    const updatedStudent = await studentmodal.updateStudent(
      updateData.first_name,
      updateData.last_name,
      updateData.email,
      updateData.gender,
      updateData.hobbies.join(','),
      updateData.country,
      updateData.state,
      updateData.city,
      updateData.file,
      student_id
    );

    console.log("updatedStudent", updatedStudent);
    

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedStudent,
      message: "Student updated successfully.",
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. " + error.message,
    });
  }
};


const searchdata =async(req,res)=>{
  //  console.log(req.body, "searchdata_req");
try {
   const f_data = req.body;
   const student_serach = await studentmodal.serach_data(f_data);
   

   res.status(200).json({
     success: true,
     data: student_serach,
     message: "student_serach successfully.",
   });
} catch (error) {
  console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal server error.",
    });
}
}

const logindata = async  (req, res) => {
  console.log(req.body,"login");
  
  try {

    const {  email, password } = req.body;

    const user = await studentmodal.login_modal({ email,password });

    console.log(user,"email");
       

    if (!user){
      return res.status(404).json({
        success:false,
        message:"User Not Found"

      })
    }


     if (!user.verifypassword) {
       return res.status(401).json({
         success: false,
         message: "Incorrect password",
       });
     }

     return res.status(200).json({
       success: true,
       message: "Login successful",
       user: {
         email: user.email,
         isAuthanticated: user.verifypassword,
         message: "Login successful",
       },
     });

  
  
} catch (error) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
}




module.exports = {get_student_data,add_studentdata,delete_Student,update_student,searchdata,logindata}