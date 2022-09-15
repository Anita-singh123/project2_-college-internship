const mongoose= require('mongoose')
const collegeModel = require('../models/collegeModel')
const InternModel= require("../models/internModel")

const createIntern= async function(req,res){
    try {
        const data= req.body
        let collegeName= data.collegeName
        let name= data.name
        let college= await collegeModel.findOne({name:collegeName})
        let object={
            name:name,
            email:data.email,
            mobile:data.mobile,
            collegeId: college["_id"]
        }
    
    const save= await InternModel.create(object)
    res.status(201).send({status:true, message:"successfully created",data:save})
        
    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}

module.exports={createIntern}
