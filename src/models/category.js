var mongoose = require('mongoose');
var Schema = mongoose.Schema


var CategorySchema = new Schema({
    restaurant_id: {
        type: String
      },
    categoryName: {
        type: String,
        required: true
    },
    subcategoryid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        default: ""
    }]

},{
    timestamps: true
  })

const Category = mongoose.model('Category', CategorySchema)
 
module.exports = Category