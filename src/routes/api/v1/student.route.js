const express =  require("express");
const { studentController } = require("../../../controller");
const upload = require("../../../middleware/upload");
const router = express.Router();

router.get(
    "/getstudent_data",
    studentController.get_student_data
)


router.post(
  "/post_Studentdata",
   upload.single("file"),  
    studentController.add_studentdata
);

router.delete(
    "/delete_studentdata/:student_id",
    studentController.delete_Student
)

router.put(
  "/updatedata_student/:student_id",
  upload.single("file"),    
  studentController.update_student
);

router.post(
  "/serachdata",
  studentController.searchdata
)

module.exports = router




// http://localhost:5000/api/v1/student/getstudent_data
// http://localhost:5000/api/v1/student/post_Studentdata
// http://localhost:5000/api/v1/student/delete_studentdata/6
// http://localhost:5000/api/v1/student/updatedata_student/1

// {
//      "first_name": "aaaaaaaaaa",
//      "last_name": "aaaaaaaaaaaaa",
//      "email":"a@gmail.com",
//      "gender":"male",
//      "hobbiesSting":["a","d"],
//      "country":"refv",
//      "state":"fdf",
//      "city":"sdf",
//      "file":"a.jpg"
// }