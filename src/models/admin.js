var mongoose = require('mongoose');
var Schema =mongoose.Schema
var bcrypt = require('bcrypt');



var AdminSchema = new Schema({ 
  username:{
    type: String
  },
  email:{
      type: String
    },
    password:{
        type: String
    },
    role:{
      type: Number,
      default: 1
    },
    phone_number:{
      type: String
    },
    status:{
      type: Number,
      default: 1
    },
    type: {
      type: Number,
      default: 0
    }
},{
  timestamps: true
})


AdminSchema.pre('save', async function(next) {
  const user = this

   user.password = await bcrypt.hash(user.password, 9);

  next()
})


AdminSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('Superuser', AdminSchema)
