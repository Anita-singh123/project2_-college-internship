const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const InternModel = require("../models/internModel")
const validation = require("../validation/validation")

const createIntern = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const data = req.body
        let { name, email, mobile, collegeName } = data
        //.....................................nameValidation.........................................//
        if (!validation.valid(name)) return res.status(400).send({ status: false, msg: "name is required" })
        if (!validation.nameValidation(name)) return res.status(400).send({ status :false, msg: "name should be an alphabet" })
       
        //....................................emailValidation..........................................//
        if (!validation.valid(email)) return res.status(400).send({ status: false, msg: "email is requires" })
        if (!validation.emailValidation(email)) return res.status(400).send({ status: false, msg: "enter valid email id" })
       let checkemail=await InternModel.findOne({email:email})
       if(checkemail) return res.status(400).send({status:false, msg:"This email Already Use"})

        //...................................mobileValidation.............................................//
        if (!validation.valid(mobile)) return res.status(400).send({ status: false, msg: "mobile number is requires" })
        if (!validation.mobileValidation(mobile)) return res.status(400).send({ status :false, msg: "mobile number should be 10 digit" })
        let checkMobile=await InternModel.findOne({mobile:mobile})
       if(checkMobile) return res.status(400).send({status:false, msg:"This Mobile Number Already Use"})

        //......................................collegenameValidation.....................................//
        if (!validation.valid(collegeName)) return res.status(400).send({ status: false, msg: "collegeName is required" })
        if (!validation.nameValidation(name)) return res.status(400).send({ status :false, msg: "collegName should be an alphabet" })
        let college = await collegeModel.findOne({ name: collegeName })
        if(!college) return res.status(400).send({status:false,msg:"This College Is Not Found"})

        let object = {
            name,
            email,
            mobile,
            collegeId: college["_id"]
        }

        const save = await InternModel.create(object)
        res.status(201).send({ status: true, message: "successfully created", data: save })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createIntern }
