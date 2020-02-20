const Category = require("../models/category");
//import Category from '../models/category';       ******ES6 module******
const Subcategory = require("../models/subcategory");
const config = require("../config.js").env;
const moment = require("moment");
var mongoose = require("mongoose");
const Sequelize = require('sequelize');
const Op = Sequelize.Op

/* ************Create Category ****************** */
module.exports.createcategory = async (req, res, next) => {
  try {
    if (!req.body.categoryName) {
      return res.json({ success: false, msg: "Category Name is required!" });
    } else if (!req.body.restaurant_id) {
      return res.json({ success: false, msg: "restaurant_id is required!" });
    }

    let createcategory = new Category({
      restaurant_id: req.body.restaurant_id,
      categoryName: req.body.categoryName,
      subcategoryid: req.body.subcategoryid
    });

    await createcategory.save();
    res.json({ createcategory, msg: "Menu Category Created Successfully." });
  } catch (err) {
    res.json({ success: false, msg: "Something went worng", err: err });
  }
};

/* ************Create Sub-Category ****************** */
module.exports.createsubcategory = async (req, res, next) => {
  try {
    if (!req.body.itemsname || !req.body.price) {
      res.json({ sucess: false, msg: "All flied required" });
    } else if (!req.body.categoryid) {
      res.json({ sucess: false, msg: "Category ID required" });
    }
    let createsubcategory = new Subcategory({
      categoryid: req.body.categoryid,
      itemsname: req.body.itemsname,
      price: req.body.price
    });

    await createsubcategory.save();
    res.json({ createsubcategory, msg: "Sub Category Created Successfully." });
    console.log(createsubcategory._id);

    await Category.updateOne(
      { _id: req.body.categoryid },
      { $push: { subcategoryid: createsubcategory._id } }
    ).exec();
  } catch (err) {
    console.log(err);

    res.json({ sucess: false, msg: "Something Went wrong", err: err });
  }
};

/* ************fetch Category and sub category ****************** */
module.exports.fetchcategory = async (req, res, next) => {
  try {
    await Category.find({ _id: req.params.id }, `_id categoryName restaurant_id`)
      .populate('subcategoryid', ` _id categoryid itemsname price `)
      .sort({ _id: 1 })
      .exec(function(err, data) {
        if (err) {
          res.json({ Error: err });
        } else {
          res.json({ data: data });
        }
      });
  } catch (err) {
    res.json({ success: false, msg: "Something Went worng", err: err });
    console.log(err);
    
  }
};

module.exports.deletecategory = async (req, res, next) => {
  try {
    await Category.findByIdAndRemove({ _id: req.params.id });
    await Subcategory.deleteMany({
      categoryid: mongoose.Types.ObjectId(req.params.id)
    });
    return res.json({ success: true, msg: "data deleted" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "Something went wrong" });
  }
};

module.exports.deletesubcategory = async (req, res, next) => {
  try {
    await Subcategory.findByIdAndRemove(req.params.id).then(result => {
      if (!result) {
        return res.json({ success: false, msg: "data not found" });
      }
      return res.json({ success: true, msg: "data delete" });
    });
  } catch (err) {
    res.json({ success: false, msg: "Something went wrong" });
  }
};

module.exports.updatecategory = async (req, res, next) => {
  try {
    Category.findByIdAndUpdate(req.params.id,
      { $set: { categoryName: req.body.categoryName } }).exec();
      res.json({ success: true, msg: 'Category updated Successfully.' })
  } catch (err) {
    res.json({ success: false, msg: "Something went wrong" });
  }
};

module.exports.updatesubcategory = async (req, res, next) => {
  try {
    Subcategory.findByIdAndUpdate(req.params.id,
      { $set: {"itemsname": req.body.itemsname, "price":req.body.price} }).exec();
      res.json({ success: true, msg: 'Sub-Category updated Successfully.' })
  } catch (err) {
    res.json({ success: false, msg: "Something went wrong" });
  }
};


/* ************fetch Menu List ****************** */
module.exports.fetchMenu = async (req, res, next) => {
  try {
    await Category.find({ restaurant_id: req.body.restaurant_id })
      .populate("subcategoryid")
      .sort({ _id: 1 })
      .exec(function(err, data) {
        if (err) {
          res.json({ Error: err });
        } else {
          res.json({ data: data });
        }
      });
  } catch (err) {
    console.log(err);
    
    res.json({ success: false, msg: "Something Went worng", err: err });
  }
};
/* **************** Search API ****************** */
module.exports.search = async (req, res, next) => { 
   try {
    // var pageOptions = {
    //   page: req.body.page || 0,
    //   limit: req.body.limit || 5
    // }

    var search_by = req.body.search_by;
    
    if (search_by) {
      search_by = search_by.toLowerCase().trim();
    //  var search_by = new RegExp('.*' + searchby + '.*', 'i');
      // query["$or"] = [
      //   {
      //     category: req.body.search_by
      //   },
      //   {
      //     subcategory: req.body.search_by
      //   }
      // ]
    };
   // console.log(query);
    //let userCount = await Category.estimatedDocumentCount(query);
     await Category.find({"categoryName": new RegExp( search_by, 'i')},(err, result) => {
       
      if (err) throw err;
      if (result) {

       return res.json(result) 
      }
    })
 
  } catch (e) {
    console.log("error", e);
    res.json({ success: false, msg: "Something went wrong!" })
  }
}
