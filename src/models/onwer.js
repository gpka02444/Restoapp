var mongoose = require('mongoose');
var Schema =mongoose.Schema
var bcrypt = require('bcrypt');

var OnwerSchema = new Schema({
 
    restaurant_id: {
    type: String
     },
    restaurant_Name:{
    type: String,
     },
    Owner_name: {
        type: String
     },
    email: {
      type: String,
      unique: true,
        },
    password: {
        type: String,
      },
    latitude: {
        type: String,
     },
     longitude: {
      type: String,
      },
     phone_number: {
         type: Number,
     }, 
     address1: {
       type: String
     },
     address2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    postal_code: {
      type: String
    },
    food_type: {
      type: String
    },
    img_file: {
      type: String
    }, 
    blocked: {
        type: Boolean,
        default: false
        },
    status: {
      type: Number,
      default: '0'
    },
    isapproved: {
      type: Number,
      default: 0
    },
    isrejected: {
      type: Number,
      default: 1
    },
    source: {
      type: String
    },
    otp_code: { type: String, default: "" }, //one time otp code
    otp_expiry: { type: Date }, // otp expiry time
}, {
  timestamps: true
})

OnwerSchema.pre('save', async function(next) {
    const user = this

     user.password = await bcrypt.hash(user.password, 8)
    next()
})

OnwerSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err)
      }
      cb(null, isMatch)
    })
  }

const Onwer = mongoose.model('Onwer', OnwerSchema)
 
module.exports = Onwer