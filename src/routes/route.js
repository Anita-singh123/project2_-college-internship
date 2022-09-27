const express= require('express')
const router = express.Router();
const CollegeController= require("../controllers/collegeController")
const InternController= require("../controllers/internController")


//........................college creation API...................................//
router.post("/functionup/colleges",CollegeController.createCollege)


//..........................Intern creation API................................//
router.post("/functionup/interns",InternController.createIntern)


//.........................college Details API...............................//
router.get("/functionup/collegeDetails",CollegeController.getCollegeDetails)




module.exports=router;