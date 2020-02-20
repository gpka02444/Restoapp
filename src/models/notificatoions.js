var mongoose = require('mongoose')
var Schema = mongoose.Schema


var notificationsSchema = new Schema ({
    text: {
        type : String
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Onwer'
      }
}, {
        timestamps: true
      })
    
module.exports = mongoose.model('notifications', notificationsSchema)