var mongoose = require('mongoose');
var Schema =mongoose.Schema
var bcrypt = require('bcrypt');


var EmployeeSchema = new Schema ({
    restaurant_id: {
      type: String
    },
    firstName: {
        type: String
     },
    lastName: {
        type: String
         },
    email: {
        type: String,
        unique: true
         },
    password: {
        type: String
      },
     phone: {
         type: Number
     }, 
     address: {
        type: String
     },
    dateofjoining: { 
      type: Date
     },
    jobprofile: {
        type: String
    },
    isActive: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      default: '0'
    },
    createdDate: { 
        type: Date,
        default: Date.now 
        },
    modifiedDate: { 
          type: Date,
          default: Date.now 
          },
          otp_code: { type: String, default: "" }, //one time otp code
          otp_expiry: { type: Date }, // otp expiry time
}, {
  timestamps: true
})

EmployeeSchema.pre('save', async function(next) {
    const user = this

     user.password = await bcrypt.hash(user.password, 8)
    next()
})

EmployeeSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }

const Employee = mongoose.model('Employee', EmployeeSchema )
module.exports = Employee