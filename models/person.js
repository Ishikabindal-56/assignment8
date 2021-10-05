const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        //required:true,
        trim:true,
        maxlength:100
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:1
    },
    phone:{
        type:String,
        minlength: [8, 'Invalid phone number'],
        maxlength: 12,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:false
    },
    checkin:{
        type:String,
        default:new Date().toLocaleTimeString()
    },
    checkout:{
        type:String
    }
})

const Person = mongoose.model('Person', personSchema);

module.exports = Person;