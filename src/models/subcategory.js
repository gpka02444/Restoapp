var mongoose = require('mongoose');
var Schema = mongoose.Schema

var SubcategorySchema = new Schema ({
        
        itemsname:{
            type: String
        },
        price: {
            type: Number
        },
        categoryid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: "category id is required"
        },
}, 
{
    timestamps: true
})

const Subcategory = mongoose.model('Subcategory', SubcategorySchema)

module.exports = Subcategory;