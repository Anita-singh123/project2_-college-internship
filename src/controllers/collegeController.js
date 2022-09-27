const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validation = require('../validation/validation')

//________________________________College Create_________________________________________________________________________________________________________________

const createCollege = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        const data = req.body
        let { name, fullName, logoLink } = data 
        
        if (!name) return res.status(400).send({ status: false, msg: "enter college name" })
        if (!validation.nameValidation(name)) return res.status(400).send({ status: false, msg: "name should be an alphabet" })

        let college = await collegeModel.findOne({ name: name })
        if (college) return res.status(400).send({ status: false, msg: "college name is already use" })

        if (!fullName) return res.status(400).send({ status: false, msg: "enter fullname " })
        if (!validation.fullNameValidation(fullName)) return res.status(400).send({ status: false, msg: "fullname should be an alphabet" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "enter logoLink" })
        if (!validation.logoValidation(logoLink)) return res.status(400).send({ status: false, msg: "logolink is required" })

        const save = await collegeModel.create(data)

        res.status(201).send({ status: true, message: "successfully created", data: save })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

//_____________________________Get College Details___________________________________________________________________________________________________________________________________

const getCollegeDetails = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    try {
        let data = req.query
        let dataArray = Object.keys(data).length   //Object Convert Into Array
        if (!dataArray) return res.status(400).send({ status: false, msg: " Data is Absent" })

        let collegeName = data.collegeName;
        if (!collegeName) return res.status(400).send({ status: false, msg: "College Name is required" })

        const saveData = await collegeModel.findOne({ name: collegeName });
        if (!saveData) return res.status(404).send({ status: false, msg: "college is not found" })

        const { name, fullName, logoLink } = saveData
        const intern = await internModel.find({ collegeId: saveData._id }).select({ _id: 1, name: 1, mobile: 1, email: 1 })
        if (intern.length == 0) intern = "noone can apply fo this college"
        let interns = {
            name,
            fullName,
            logoLink,
            intern
        }


        res.status(201).send({ status: true, message: "successfully name found ", data: interns })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createCollege, getCollegeDetails }















































