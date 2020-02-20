var mongoose = require('mongoose');
var Schema =mongoose.Schema
var bcrypt = require('bcrypt');


var UserSchema = new Schema({
    device_id: {
        type: String,
        default: ""
    },
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    conutryCode: {
        type: Number
      },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    source: {
        type: String
    },
    status: {
        type: Number,
        default: '0'
    },
    otp_code: { 
        type: String, 
        default: "" 
    }, //one time otp code
    otp_expiry: { 
        type: Date 
    }, // otp expiry time
    userImage: {
    type: String,
    default: ""
  }
}, {
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    const user = this

     user.password = await bcrypt.hash(user.password, 9)
    next()
})

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }



const User = mongoose.model('User', UserSchema)
module.exports = User