const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const valid = require('validator')

const internSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'name is mandatory',
        trim: true
    },
    email:{
        type: String,
        required: 'email is mandatory',
        unique: true,
        trim: true
    },
    mobile:{
        type: String,
        required: 'mobile  number is mandatory',
        unique: true,
        trim: true,
        validate:{
            validator: function (mobile)
        {
          const phoneno = /^\d{10}$/;
          if((mobile.value.matc(phoneno)))
                {
              return true;
                }
              else
                {
                alert("Enter Valid mobile number");
                return false;
                }
        }
        }
     },
     collegeID:{
        type: ObjectId,
        ref: "college",
     },
     isDeleted: {
        type: Boolean,
        default: false
     }

}, {timestamps:true})

module.exports = mongoose.model("intern",internSchema)