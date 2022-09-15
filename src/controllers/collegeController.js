const mongoose= require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
//const CollegeModel= require("../")

const createCollege= async function(req,res){
    try {
        const data= req.body
        const save= await collegeModel.create(data)
        if(!save)
        res.status(201).send({status:true, message:"successfully created",data:save})
        
    } catch (error) {
        res.status(500).send({status:false, message:error.message })
    }
    
}

const getCollegeDetails= async function(req,res){
    try{
    let collegeName= req.query.collegeName;
    const saveData= await collegeModel.findOne({name:collegeName});
    if(!saveData) return res.status(404).send({status:false, msg:"college is not found"})
    const {name,fullName,logoLink}=saveData
    const intern= await internModel.find({collegeId:saveData._id}).select({_id:1,name:1,mobile:1,email:1})
    if(intern.length==0) intern="noone can apply fo this college"
    let interns={
        name,
        fullName,
        logoLink,
        intern
    }


    res.status(201).send({status:true,message:"successfully name found ",data:interns})
}
catch(err){
    res.status(500).send({status:false,message:error.message})
}
}

module.exports={createCollege,getCollegeDetails}















































