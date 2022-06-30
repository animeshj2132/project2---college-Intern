const internModel = require("../Models/InternModel")
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

//     //     return mongoose.Types.ObjectId.validBody(ObjectId)
//     // }
//     // if(!CollegeIdPresent(collegeId)){return res.status(400).send({ status: false, message: "enter valid college id" })}
// }

let nameValidator = function (data) {
    let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
    return regx.test(data);
}

const validRequest = function (data) {
    return Object.keys(data).length > 0
}

const createIntern = async (req, res) => {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data

        //check required fields
        if (!validRequest(data)) { return res.status(400).send({ status: false, message: "required details (name, email, mobile, collegeId) are missing" }) }

        if (!validBody(name)) { return res.status(400).send({ status: false, message: "enter the name" }) }

        if (!validBody(email)) { return res.status(400).send({ status: false, message: "enter the email" }) }

        if (!validBody(mobile)) { return res.status(400).send({ status: false, message: "enter the mobile" }) }

        if (!validBody(collegeName)) { return res.status(400).send({ status: false, message: "enter the collegeId" }) }
        if (!nameValidator(collegeName)) return res.status(400).send({ status: false, message: "please enter college name correctly" })
        let college = await collegeModel.findOne({ name: collegeName })
        if (!college) return res.status(400).send({ status: false, message: "No college found with this name" })



        //validations

        if (!nameValidator(name)) return res.status(400).send({ status: false, message: "name should be between A=Z or a-z" })

        let validate = emailValidator.validate(data.email); //emailValidator use
        if (validate == false) {
            return res.status(400).send({ status: false, msg: "You have entered an invalid email address!" })
        }


        let checkIntern = await internModel.findOne({ email: email })
        if (checkIntern) { return res.status(400).send({ status: false, msg: "this email is already in use" }) }

        let mobileValidation = function validatePhoneNumber(mobile) {
            var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/; //regex validator

            return re.test(mobile);
        }

        if (!mobileValidation(mobile)) { return res.status(400).send({ status: false, msg: "enter valid mobile number" }) }

        let checkIntern1 = await internModel.findOne({ mobile: mobile })
        if (checkIntern1) { return res.status(400).send({ status: false, msg: "this mobile number is already in use" }) }

        let collegeData = { name: name, email: email, mobile: mobile, collegeId: college._id.toString() }
        let savedData = await internModel.create(collegeData)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


module.exports.createIntern = createIntern

