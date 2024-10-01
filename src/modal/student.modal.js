const path = require("path");
const  pool  = require("../db/Sql");

const getstudent = async (req,res) => {
    try {
        const [result,field] = await pool.execute(" SELECT * FROM  student_master");

        return result
    } catch (error) {
        console.log(error);
        
    }
}


const addstudent = async (first_name,last_name,email,gender,hobbies,country,state,city,file) => {
  console.log(file, "aaaaaaa");

  try {
    //   if (!Array.isArray(hobbies)) {
    //     console.error("Hobbies is not an array:", hobbies);
    //   }
    // const hobbiesString = hobbies.join(",");
    const [data] = await pool.execute(
      "INSERT INTO student_master(first_name,last_name,email,gender,hobbies,country,state,city,file) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        first_name,
        last_name,
        email,
        gender,
        hobbies,
        country,
        state,
        city,
        file,
      ]
    );
    console.log("Inserted Data:", data);
    return {
      first_name: data.insertId,
      last_name,
      email,
      gender,
      hobbies,
      country,
      state,
      city,
      file,
    };
  } catch (error) {
    console.log(error);
  }
}

const deleteStudent = async (student_id) => {
    try {
        const [result] = await pool.execute("DELETE FROM student_master WHERE student_id=?", [student_id])
        // console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error in delete student.", error)
    }
}


const updateStudent = async (first_name, last_name, email, gender, hobbies, country,state,city, student_id) => {
    try {
        const [result] = await pool.execute(
          "UPDATE student_master SET first_name=?, last_name=? ,email=?,gender=?,hobbies=?,country=?,state=?,city=? WHERE student_id=?",
          [first_name, last_name, email, gender, hobbies, country,state,city, student_id]
        );
      return {first_name,last_name,email,gender,hobbies,country,state,city,student_id}
    } catch (error) {
        console.log(error);
        throw new Error("Error in update student.", error)
    }
}




// const serach_data = async (data)=>{
//   console.log(data,"modal");
  
// try {
//   const f_data = data.f_data;
//   // const l_name  = data.l_name;
//   // const emaildata =data.emaildata;

//    const [result] = await pool.execute("SELECT * FROM student_master WHERE first_name=?", [f_data]);
//     return result;
// } catch (error) {
//   console.log(error);
//   throw new Error("Error in serach student.", error);
// }
// }

const serach_data = async (data) => {
  // console.log(data, "modal");

  try {
    const f_data = data.f_name;
    const l_name = data.l_name;
    const emaildata =data.emaildata
    // console.log(f_data, "Aaaaaaaaaaaaaaaaaaa");

    const queryParamter =[];
    let query = "SELECT * FROM student_master";

    if (f_data || l_name || emaildata) {
      query += " WHERE ";
    }

    if (f_data) {
      query += " first_name=?";
      queryParamter.push(f_data);
    }

    if (l_name) {
      if (queryParamter.length > 0) query += " OR ";      
      query += " last_name =? "; 
      queryParamter.push(l_name);
    }

    if (emaildata) {
       if (queryParamter.length > 0) query += " OR "
       query += " email = ?";
       queryParamter.push(emaildata );
    }
// console.log(query, "ferfnrejfkrjfeij");

    const [result] = await pool.execute(query,queryParamter);
    // console.log(result,"ans");
    
    
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error in serach student.", error);
  }
};

module.exports = {getstudent,addstudent,deleteStudent,updateStudent,serach_data}