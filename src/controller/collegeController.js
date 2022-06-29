const collegeModel = require('../Models/CollegeModel');
const internModel = require('../Models/InternModel')

const bodyValidator = function (data) {
    return Object.keys(data).length > 0
}

const isValid = function (data) {
    if (typeof data === "undefined" || typeof data === "number" || data === null) return false
    if (typeof data === "string" && data.trim().length === 0) return false

    return true;
}

let nameValidator = function(data){
    let regx = /^[a-zA-z]+([\s][a-zA-Z\,]+)*$/;
    return regx.test(data);
}

const regxUrlValidator = function (url) {
    let regx = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    return regx.test(url)
}

const createColleges = async function (req, res) {
    try {
        if (!bodyValidator(req.body)) return res.status(400).send({ status: false, message: "please provide details" })
        const { name, fullName, logoLink } = req.body
        if (!isValid(name)) return res.status(400).send({ status: false, message: "please provide Name" })
        if(!nameValidator(name)) return res.status(400).send({status: false , message: "Enter a valid name"})
        if (!isValid(fullName)) return res.status(400).send({ status: false, message: "please provide Full Name" })
        if(!nameValidator(fullName)) return res.status(400).send({status: false , message: "Enter a valid full Name"})
        if (!isValid(logoLink)) return res.status(400).send({ status: false, message: "please provide Logo Link" })
        if (!regxUrlValidator(logoLink)) return res.status(400).send({ status: false, message: "please provide valid url" })
 
        let checkName = await collegeModel.findOne({name : name})
        if(checkName) return res.status(409).send({status : false , message: "The name is already registered, provide different name"})
        const isUrl = await collegeModel.findOne({logoLink : logoLink})
        if(isUrl) return res.status(400).send({status: false , message: "The url is already registered"})
        let data = req.body
        let newCollege = await collegeModel.create(data)
        res.status(201).send({ status: true, data: newCollege })
    }
    catch(err){
        res.status(500).send({status : false , message : err.message})
    }
    
}


const collegeDetails = async function(req,res){
    try{
        let name = req.query.collegeName
        if(name){
            let college = await collegeModel.findOne({name: name, isDeleted: false})
            if(!college) {
                res.status(404).send({status: false, msg: 'College not found'})
            }else{
                let collegeData = {
                    name: college.name,
                    fullName: college.fullName,
                    logoLink: college.logoLink
                }
                let interns = await internModel.find({collegeId: college.id, isDeleted: false})
                if(interns){
                    collegeData.interns = interns
                }
                res.status(200).send({status:true, data: collegeData})
            }
        }else{
            res.status(400).send({status: false, msg: "College name required"})
        }

    }catch(err){
        res.status(500).send({status : false , message : err.message})
}
}
module.exports = {createColleges, collegeDetails}