const collegeModel = require('../Models/CollegeModel');

const bodyValidator = function (data) {
    return Object.keys(data).length > 0
}

const isValid = function (data) {
    if (typeof data === "undefined" || typeof data === "number" || data === null) return false
    if (typeof data === "string" && data.trim().length === 0) return false

    return true;
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
        if (!isValid(fullName)) return res.status(400).send({ status: false, message: "please provide Full Name" })
        if (!isValid(logoLink)) return res.status(400).send({ status: false, message: "please provide Logo Link" })
        if (!regxUrlValidator(logoLink)) return res.status(400).send({ status: false, message: "please provide valid url" })
        let data = req.body
        let newCollege = await collegeModel.create(data)
        res.status(201).send({ status: true, data: newCollege })
    }
    catch(err){
        res.status(500).send({status : false , message : err.message})
    }
    
}

module.exports = {createColleges}