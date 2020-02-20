const mongoose = require("mongoose");
const Onwer = require("../models/onwer");
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const config = require("../config.js").env;
const moment = require("moment");
const admin = 'rishavsharma@gmail.com';
const nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var multer = require('multer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
    user: 'rishavsharma688777@gmail.com',
    pass: '9805654093'
  }
});


const upload = multer({
  dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
  }
})

const validateLoginInput = require('../validation/Ownerlogin');
const validateSignupInput = require('../validation/OwnerSignup')
/* **************** LOGIN **************** */
module.exports.signin = async (req, res, next) => {

   // Form validation
   const { errors, isValid } = validateLoginInput(req.body);
   // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }
 await Onwer.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, msg: "Your email is not registered with app"
      });
     }  else if (user.blocked == true) {
      res.json({ success: false, msg: 'Your account has been blocked kindly contact to admin: ' + admin });   
    }else {
      user.comparePassword(req.body.password, async (err, isMatch) => {
        if (isMatch && !err) {
          if (user.isapproved == 0) {
            res.json({success: false,msg: "wait for approved"});
            return;
          }
          const token = jwt.sign(user.toJSON(), config.secret);
          let device_id = token.slice(-30);
          Onwer.findOneAndUpdate({ email: req.body.email },
            {  $set: { device_id: device_id, deviceToken: req.body.devicetoken  } });
          res.json({success: true,msg: "Login Successfully.", token: token,
            Onwer: {
              device_id: user.device_id,
              _id: user._id,
              restaurant_id: user.restaurant_id,
              restaurant_Name: user.restaurant_Name,
              email: user.email,
              countrycode: user.countrycode,
              phone: user.phone,
              firstName: user.firstName,
              lastName: user.lastName,
              blocked: user.blocked,
              isapproved: user.isapproved,
              isrejected: user.isrejected
            }
          });
        } else {
          res.json({success: false, msg: "Authentication failed. Wrong password."});
        }
      });
    }
  });
};

/* ******************************signup************************** */
module.exports.signup = async (req, res, next) => {
 // Form validation
 const { errors, isValid } = validateSignupInput(req.body);
 // Check validation
 if (!isValid) {
   return res.status(400).json(errors);
 }

  try {
    let device_id = "5555555555";
    let founduser = await Onwer.findOne({email: req.body.email});
    if (founduser) {
      res.json({success: false, msg: "User Email Address Already Exists!" });
    } else {
      let todaysDate = moment().format("YYYY-MM-DD");
      let randomnum = Math.random().toString().substr(2, 7);
     
      req.body.firstName = req.body.firstName.toLowerCase().replace(/ /g, "").trim() || "";
      req.body.lastName =req.body.lastName .toLowerCase().replace(/ /g, "").trim() || "";

      let user = new Onwer({
        device_id: device_id,
        restaurant_id: randomnum,
        restaurant_Name: req.body.restaurantName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        countrycode: req.body.countrycode,
        phone: req.body.phone,
        location: req.body.location,
        password: req.body.password,
        blocked: req.body.blocked,
        createdDate: todaysDate,
        modifiedDate: todaysDate,
        status: 0,
        isapproved: 0,
        isrejected: 1
      });

      await user.save();
       res.json({ user, msg: "User Created Successfully." });
    }
  } catch (e) {
    console.log("Error", e);
    res.json({
      success: false,msg: "Unable to Create User!"});
  }
};


/* ***************ApprovedUser***************** */
module.exports.approvedusers = async (req, res, next) => {
  try {
    const user = await Onwer.find({ isapproved: 1 }, '_id device_id firstName lastName email phone location createdDate modifiedDate status isapproved isrejected').sort({"_id":-1});
    res.json({ success: true, data: user });
  } catch (e) {
    res.json({ success: false, msg: "Something went wrong!" });
  }
};

/* ***************PendingUser***************** */
module.exports.pending = async (req, res, next) => {
  try {
    const user = await Onwer.find({ isapproved: 0 }, '_id device_id firstName lastName email phone location createdDate modifiedDate status isapproved isrejected').sort({"_id": -1});
    res.json({ success: true, data: user });
  } catch (e) {
    res.json({ success: false, msg: "Something went wrong!" });
  }
};

/* *****************Approved ***************** */
module.exports.approved = async (req, res, next) => {
  try {
    await Onwer.findByIdAndUpdate(req.params.id, 
    { $set: { isapproved: 1, isrejected: 0 } }, { new: true }).then(user => {
  
    if(!user) {
        return res.status(400).send({message: "User not found  💔 "});
      }

  var mailOptions = {
    to: user.email,
    from: '"Admin" <rishavsharma688777@gmail.com',
    subject: 'Approved Request',
    html: `<h4> Hello ${user.firstName}, <br> Your request has been Approved by Admin. Now you Signin </h4>`
        }
    transporter.sendMail(mailOptions, async function (err, info) {
    if (err) {
    res.json({ success: false, msg: "Email not Send" });
      }
    else {
       res.json({ success: true, data: user });
         }
      })
         }).catch(err => {
          return res.status(500).send({Error: err, message: "Error updating note with id "});
        });
     }catch (e) {
    console.log(e);
      res.json({ success: false, msg: "Something went wrong!" });
    }
};

/* *********Rejected****************** */
module.exports.rejected = async (req, res, next) => {
  try {
 await Onwer.findByIdAndRemove(req.params.id).then(user => {
  if(!user) {
    return res.status(404).send({message: "User not found"});
  }
  var mailOptions = {
  to: user.email,
  from: '"Admin" <rishavsharma688777@gmail.com',
  subject: 'Rejected Request',
  html: `<h4> ${user.firstName}, <br> Your request has been rejected by Admin. Please again Signup with correct data </h4>`
    }
transporter.sendMail(mailOptions, async function (err) {
if (err) {
  res.json({ success: false, msg: "Email Not found" });
   }
   else {
      res.json({ success: true, msg: "Rejected", user : user }); 
        }
    })
  })
    }
  catch (e) {
    res.json({ success: false, msg: "Something went wrong!" });
  }
};

/* ****************fORGETPASSWORD************** */
module.exports.forgetpassword = async (req, res, next) => {
  try {

   await Onwer.findOne({email: req.body.email}, async (err, user) => {
      if (err) throw err

      if (!user){
        res.json({ success: false, msg: "We couldn't find an account with the email you entered. Please try a different email address." })
      } else {
      const otp_code = Math.random().toString().substr(2, 6)
         var mailOptions = {
            to: req.body.email,
            from: '"Admin" <rishavsharma688777@gmail.com',
            subject: 'Forget Password',
            text: `Please use this OTP code to reset password ${ otp_code }`
          }
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("not sent bcz: " + error);
          } else {
            console.log("mail_info");
            console.log(info.messageId);
          }
        }); 

        let timeStamp = new Date().getTime();
        let otp_expiry = timeStamp + (30 * 60 * 1000);

        await Onwer.updateOne({email: req.body.email}, { $set: {otp_code: otp_code, otp_expiry: new Date(otp_expiry ) } });
        res.json({ success: true, msg: "We've sent an OTP code to your email address. Please enter the code to reset your password.", })
         }
      })
    } catch (e) {
      res.json({ success: false, msg: "Something went wrong!" })
  }
}

/* ****************RESETPASSWORD ************** */
module.exports.resetpassword = async (req, res, next) => {
  try {

     if (!req.body.otp_code || !req.body.email || req.body.password) {
      return res.status(400).json({ success: false, msg: "We couldn't find an account with the email you entered. Please try a different email address." });
    }

    let otp = req.body.otp_code.toString().toLowerCase().trim();

    // find user by email 
    let user = await Onwer.findOne({ otp_code: otp, email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "You have entered an incorrect OTP code." });
    }

    let otp_expiry = user["otp_expiry"];
    let current_date = new Date();

    // check for otp expiry 
    if (moment(current_date).isAfter(otp_expiry)) {
      return res.status(400).json({ success: false, msg: "Your OTP code has been expired." });
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("err: ", err);
        return res.json({ success: false, msg: 'Unable to Complete process!' })
      }

      bcrypt.hash(req.body.password, salt, null, async function (err, hash) {
        if (err) {
          console.log("err: ", err);
          return res.json({ success: false, msg: 'Unable to Complete process!' })
        } else {
          var result = await Onwer.findOneAndUpdate({ email: req.body.email }, { $set: { password: hash } }, { new: true })
          console.log("result", result)
          return res.json({ success: true, msg: 'Your password has been resetted Successfully..', })
        }
      });
    })
  } catch (e) {
    console.log("Error", e);
    return res.json({ success: false, msg: 'Unable to Complete process!' })
  }
}


/* *********************CHANGEPASSWORD **************** */
module.exports.changepassword = async (req, res, next) => {
 await Onwer.findOne({email: req.body.email }, (err, user) => {
    if (err) throw err
    if (!user) {
      res.json({ success: false, msg: 'Authentication failed. User not found.' })
    } else {
      // check if password matches
      user.comparePassword(req.body.password, async (err, isMatch) => {
        if (isMatch && !err) {
          let newpassword = req.body.newpassword;
          bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              res.json({ success: false, msg: err })
            }
            bcrypt.hash(newpassword, salt, null, async function (err, hash) {
              if (err) {
                res.json({ success: false, msg: err })
              }
              newpassword = hash;
              await Onwer.findOneAndUpdate({ email: req.body.email }, { $set: { password: newpassword } })
              res.json({ success: true, msg: 'Password Updated Successfully.' })
            })
          })
        } else {
          res.json({ success: false, msg: 'Authentication failed. Wrong password.' })
        }
      })
    }
  })
}


module.exports.blocked = async (req, res, next) => {
  try {
    await Onwer.findByIdAndUpdate(req.params.id, 
    { $set: { blocked: true } }, { new: true }).then(user => {
  
    if(!user) {
        return res.status(400).send({message: "User not found  💔 "});
      }

  var mailOptions = {
    to: user.email,
    from: '"Admin" <rishavsharma688777@gmail.com',
    subject: 'Block Email',
    html: `<h4>Hello ` + user.firstName + " " + user.lastName + `,<br>  We know this news is likely disappointing to you.   We have blocked your access to MeMe App indefinitely. Our decision is based on a careful review and some security reasons.   If you want to appeal this decision, you can email us at support@admin.com. Please note each case will be manually reviewed by our Trust & Safety team to decide if your account can be reinstated.  Please know we don’t make decisions like these lightly and wish you the best of luck in your future endeavors. <br>  Regards, <br> Admin Trust & Safety</h4>  `
        }
    transporter.sendMail(mailOptions, async function (err, info) {
    if (err) {
    res.json({ success: false, msg: "Email not Send" });
      }
    else {
       res.json({ success: true, data: user });
         }
      })
         }).catch(err => {
          return res.status(500).send({Error: err, message: "Error updating note with id "});
        });
     }catch (e) {
    console.log(e);
      res.json({ success: false, msg: "Something went wrong!" });
    }
};

module.exports.unblocked = async (req, res, next) => {
  try {
    await Onwer.findByIdAndUpdate(req.params.id, { $set: {blocked: false} }, {new : true}).then(user => {
      if(!user) {
        return res.status(400).send({message: "User not found  💔 "});
      }
      
      return res.status(400).send({user: user, message: "Unblock Successfully "});
    }).catch((err) => {
      return res.status(500).send({Error: err, message: "Error updating note with id "});
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "Something went wrong!" });
     
  }
}



/* *************APP USERS API ***************************************************** */


/* ************* Login User *************** */

module.exports.userlogin = async (req, res, next) => {
   try {
      await User.findOne({ email: req.body.email}, (err, user) => {
      if (err) throw err;

      if (!user) {
       res.json({ success: false, msg: "User is not registered with app"});
      }
       else {
         // compare password
     user.comparePassword(req.body.password, async (err, isMatch) => {
       if(isMatch && !err) {
       const token = jwt.sign(user.toJSON(), config.secret);
       let device_id = token.slice(-30);
        User.findOneAndUpdate({ email: req.body.email },
        {  $set: { device_id: device_id, deviceToken: req.body.devicetoken  } });
          res.json({success: true,msg: "Login Successfully.", token: token,
            User: {
              device_id: user.device_id,
              _id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              countrycode: user.countrycode,
              phone: user.phone,
            }       
       })
       }else {
        res.json({success: false, msg: "Authentication failed. Wrong password."}) 
       }
    })
       }
     })
     } catch (err) {
       console.log(err);
       
     res.json({success: false, msg: "Something Went wrong"})
   }
}

/* ************* User signup *************** */
module.exports.usersignup = async (req, res, next) => {
 try {
   let device_id = "5555555555";
   if (!req.body.password || !req.body.firstName || !req.body.phone) {
    return res.json({ success: false, msg: "field are required!"});
  } 

  let founduser = await User.findOne({phone: req.body.phone});
  if(founduser) {
    res.json({success: false, msg: "User Phone No. Already Exists!"})
  } else {
    let todaysDate = moment().format("YYYY-MM-DD");

    req.body.firstName = req.body.firstName.toLowerCase().replace(/ /g, "").trim() || "";
    req.body.lastName =req.body.lastName .toLowerCase().replace(/ /g, "").trim() || "";

    let user = new User({
      device_id: device_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email.toLowerCase(),
      countrycode: req.body.countrycode,
      phone: req.body.phone,
      password:req.body.password,
      status: 0,
      source: req.body.source,
      userImage: req.body.userImage || ""
    });


   await user.save();
  res.json({user,success: true, msg: "User Sucessfully Created"})
  } 
} catch (err) {
    console.log(err);
    res.json({success: false, Error: err, msg: "Something went wrong"})
   }

}

/* ************* USER FORGETPASSWORD *************** */
module.exports.userforgetpassword = async (req, res, next) => {
  try {
 await User.findOne({email: req.body.email}, async (err, user) => {
      if (err) throw err

      if (!user){
        res.json({ success: false, msg: "We couldn't find an account with the email you entered. Please try a different email address." })
      } else {
      const otp_code = Math.random().toString().substr(2, 6)
         var mailOptions = {
            to: req.body.email,
            from: '"Admin" <rishavsharma688777@gmail.com',
            subject: 'Forget Password',
            text: `Please use this OTP code to reset password ${ otp_code }`
          }
        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("not sent bcz: " + error);
          } else {
            console.log("mail_info");
            console.log(info.messageId);
          }
        }); 

        let timeStamp = new Date().getTime();
        let otp_expiry = timeStamp + (30 * 60 * 1000);

        await User.updateOne({email: req.body.email}, { $set: {otp_code: otp_code, otp_expiry: new Date(otp_expiry ) } });
        res.json({ success: true, msg: "We've sent an OTP code to your email address. Please enter the code to reset your password.", })
        console.log(otp_code);
        
         }
      })
    } catch (e) {
      res.json({ success: false, msg: "Something went wrong!" })
  }
}

/* ***********Facebook Signin ****************** */

module.exports.facebooksignin = async (req, res, next) => {
  try {

      let device_id = "5555555555";
     let founduser = await User.findOne({ $or : [{ phone : req.body.phone }, {email: (req.body.email).toLowerCase() } ] })
     if (founduser){
       const token = jwt.sign(founduser.toJSON(), config.secret);
       let device_id = token.slice(-30);
       await User.findOneAndUpdate({ _id : founduser._id_}, {$set : {device_id: device_id} });
       res.json({success: true , msg: 'Login Successfully.', token: token, User: founduser });
     } 
     else {
       let todaysDate = moment().format("YYYY-MM-DD");
       let name = req.body.name.split(' ');
       req.body.firstName= name[0].toLowerCase().replace(/ /g, '').trim() || "";
       req.body.lastName= name[1].toLowerCase().replace(/ /g, '').trim() || "";
       let user = new User({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email.toLowerCase(),
         phone: req.body.phone,
         device_id: device_id,
         location: req.body.location,
         createdDate: todaysDate,
         modifiedDate: todaysDate,
         status: 0,
         source: 'facebook'
       });
 
       
       await user.save();
        res.json({ success: true, msg: 'User Created and Login Successfully.', User: user  });
        }
  } catch (e) {
    console.log(e);
    
   res.json({ success: false, msg: "Something went wrong!" });
  }
 
 }


 /* *************************  LOGIN WITH GOOGLE ************** */

 module.exports.googlesignin = async (req, res, next) => {
   try {
     let device_id
   } catch (err) {
     res.json({success: false, msg:"Something Went Wrong"})
   }
 }

/* **************** USER RESETPASSWORD ************** */
module.exports.userresetpassword = async (req, res, next) => {
  try {

     if (!req.body.otp_code || !req.body.email || !req.body.password) {
      return res.status(400).json({ success: false, msg: "We couldn't find an account with the email you entered. Please try a different email address." });
    }

    let otp = req.body.otp_code.toString().toLowerCase().trim();

    // find user by email 
    let user = await User.findOne({ otp_code: otp, email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, msg: "You have entered an incorrect OTP code." });
    }

    let otp_expiry = user["otp_expiry"];
    let current_date = new Date();

    // check for otp expiry 
    if (moment(current_date).isAfter(otp_expiry)) {
      return res.status(400).json({ success: false, msg: "Your OTP code has been expired." });
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log("err: ", err);
        return res.json({ success: false, msg: 'Unable to Complete process!' })
      }

      bcrypt.hash(req.body.password, salt, null, async function (err, hash) {
        if (err) {
          console.log("err: ", err);
          return res.json({ success: false, msg: 'Unable to Complete process!' })
        } else {
          var result = await User.findOneAndUpdate({ email: req.body.email }, { $set: { password: hash } }, { new: true })
          console.log("result", result)
          return res.json({ success: true, msg: 'Your password has been resetted Successfully..', })
        }
      });
    })
  } catch (e) {
    console.log("Error", e);
    return res.json({ success: false, msg: 'Unable to Complete process!' })
  }
}


/* ********************* USER CHANGEPASSWORD **************** */

module.exports.userchangepassword = async (req, res, next) => {
 await User.findOne({email: req.body.email }, (err, user) => {
    if (err) throw err
    if (!user) {
      res.json({ success: false, msg: 'Authentication failed. User not found.' })
    } else {
      // check if password matches
      user.comparePassword(req.body.password, async (err, isMatch) => {
        if (isMatch && !err) {
          let newpassword = req.body.newpassword;
          bcrypt.genSalt(10, function (err, salt) {
            if (err) {
              res.json({ success: false, msg: err })
            }
            bcrypt.hash(newpassword, salt, null, async function (err, hash) {
              if (err) {
                res.json({ success: false, msg: err })
              }
              newpassword = hash;
              await User.findOneAndUpdate({ email: req.body.email }, { $set: { password: newpassword } })
              res.json({ success: true, msg: 'Password Updated Successfully.' })
            })
          })
        } else {
          res.json({ success: false, msg: 'Authentication failed. Wrong password.' })
        }
      })
    }
  })
}

/* ***************** User edit Account ***************** */

module.exports.edituser = async (req, res , next) => {
  try {
    await User.findByIdAndUpdate(req.params.id,
       { $set: { phone: req.body.phone, email: req.body.email}}).then(user => {
      
      if(!user) {
        return res.status(400).send({message: "User not found  💔 "});
      }
      res.json({ success: true, message: "Data update Successfully" });
    })
    
  } catch (er) {
    console.log(err);
    res.json({success: false, msg:"Something Went Wrong"})
    
    
  }
}

/* ****** Profile Pic ******** */

module.exports.uploadimage =  async (req, res) => {
  try {
  
    let userimage = await User.findOneAndUpdate(req.params.id , { $set: { userImage: req.body.userimage } })
    console.log(userimage);
    
    if (userimage !== null) {
      res.json({ success: true, msg: "File Uploaded Successfully!" })
    } else {
      res.json({ success: true, msg: "Unable to update User Image!" })
    }
  } catch (e) {
    console.log("error", e)
    res.json({ success: false, msg: "Something went wrong!" })
  }
}
 
/* **** LOGOUT Owner ******** */
module.exports.logoutOwner = async (req, res, next) => {
  try {
    await Onwer.updateOne({ _id: req.user._id }, { $set: { deviceToken: req.body.devicetoken } })
    res.json({ success: true, msg: "You has been logout Successfully!" })
  } catch (e) {
    console.log("error", e)
    res.json({ success: false, msg: "Something went wrong!" })
  }
}

/* **** LOGOUT User ******** */

module.exports.logoutUser = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.user._id }, { $set: { deviceToken: req.body.devicetoken } })
    res.json({ success: true, msg: "You has been logout Successfully!" })
  } catch (e) {
    console.log("error", e)
    res.json({ success: false, msg: "Something went wrong!" })
  }
}