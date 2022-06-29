const internModel = require ("../Models/InternModel")
const collegeModel = require("../Models/CollegeModel")
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId
const emailValidator = require("email-validator")
const validator = require("validator")

const validBody = function (value) {

    if (typeof value === 'undefined' || value === null) {
        return false
    }
    if (typeof value === 'string' && value.trim().length == 0) {
        return false
    }
    return true

}

// const CollegeIdPresent = function (ObjectId) {

//     return mongoose.Types.ObjectId.validBody(ObjectId)
// }


const validRequest = function (data) {
    return Object.keys(data).length > 0
}

const createIntern = async (req, res) => {
   try{ 
    let data = req.body
    let {name, email, mobile, collegeId} = data
    let collegeID = await collegeModel.findById(collegeId)
        //check required fields
        if(!validRequest(data)){return res.status(400).send({ status: false, message: "required details (name, email, mobile, collegeId) are missing" })}

        if(!validBody(name)){return res.status(400).send({ status: false, message: "enter the name" })}

        if(!validBody(email)){return res.status(400).send({ status: false, message: "enter the email" })}

        if(!validBody(mobile)){return res.status(400).send({ status: false, message: "enter the mobile" })}

        if(!validBody(collegeId)){return res.status(400).send({ status: false, message: "enter the collegeId" })}

        //ID not valid
        // if(!CollegeIdPresent(collegeId)){return res.status(400).send({ status: false, message: "enter valid college id" })}

        // if(collegeId.length != 24){return res.status(400).send({ status: false, message: "enter valid college id" })}

        //ID is not in db
        if(!collegeID){return res.status(400).send({ status: false, message: "collegeId is not present" })}

        //validations
    let validate = emailValidator.validate(data.email);
        if (validate == false){
            return res.status(400).send({status:false, msg: "You have entered an invalid email address!" })}

    let nameValidate = validator.isAlpha(data.name);
        if (nameValidate == false){
            return res.status(400).send({status:false, msg: "name must be between A-Z or a-z " })}

    let checkIntern= await internModel.findOne({email:email})
      if(checkIntern){return res.status(400).send({status:false,msg:"this email is already in use"})}
    
     let mobileValidation = function validatePhoneNumber(mobile) {
        var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      
        return re.test(mobile);
      }

      if(!mobileValidation(mobile)){ return res.status(400).send({status: false, msg:"enter valid mobile number"})}
    
    let checkIntern1= await internModel.findOne({mobile:mobile})
        if(checkIntern1){return res.status(400).send({status:false,msg:"this mobile number is already in use"})}
    
     let savedData = await internModel.create(data)
     res.status(201).send({ status: true, data: savedData })
 }
 catch(err){
     res.status(500).send({status : false , message : err.message})
 }
 
}


module.exports.createIntern = createIntern

    // if (Object.keys(data).length == 0){
    // return res.status(400).send({status:false, msg: "Object can not be empty" })
    // }

        
    // // if(collegeId != 24){
    // //     return res.status(400).send({status: false, msg: "collegeId is invalid"})
    
    // if (!collegeID) {
    //     return res.status(404).send({status:false, msg: "College does not exist" })
    // }
    
    // if (!("name" in data) || !("email" in data) || !("mobile" in data)) {
    //     return res.status(422).send({status:false, msg: "required fields missing (title,body,authorId,category)" })
    // }
    
    // // let type = typeof data
    // // if (type == "object")
    // //   return res.status(400).send({status:false, msg: "input data can not be null" });
    // //  if(type !="string" )
    // //  return res.status(400).send({status:false,msg:"input data must be string"}) 
    // // if (data.toLowerCase() == "undefined")
    // //   return res.status(400).send({status:false, msg: "input data can not be undefined" });


    // if (
    //     data.collegeId.trim() == "" ||
    //     data.name.trim() == "" ||
    //     data.email.trim() == "" ||
    //     data.mobile.trim()  == ""
    //   ) {
    //     return res.status(400).send({status:false, msg: "required fields(name, email, mobile, collegeId) can not be empty"})
    //   }

    //   let nameValidate = validator.isAlpha(data.name);
    //   if (nameValidate == false)
    //   return res
    //     .status(400)
    //     .send({status:false, msg: "name must be between A-Z or a-z " });

    //   let validate = emailValidator.validate(data.email);
    //   if (validate == false){
    //     return res.status(400).send({status:false, msg: "You have entered an invalid email address!" })
    //   }
     