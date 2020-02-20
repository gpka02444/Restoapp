const Superuser = require("../models/admin");
const Employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const config = require("../config.js").env;
const moment = require("moment");
const nodemailer = require("nodemailer");
var bcrypt = require("bcrypt-nodejs");
var generator = require("generate-password");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rishavsharma688777@gmail.com",
    pass: "9805654093"
  }
});

/* ************ ADMIN LOGIN **************** */
module.exports.login = async (req, res, next) => {
  try {

    await Superuser.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;

      if (!user) {
        res.json({ success: false, msg: "Your username is incorrect" });
      } else {
        user.comparePassword(req.body.password, async (err, isMatch) => {
          const token = jwt.sign(user.toJSON(), config.secret);
          let device_id = token.slice(-30);

          Superuser.findOneAndUpdate(
            { username: req.body.usernameil },
            { $set: { deviceToken: req.body.devicetoken } }
          );
          if (isMatch && !err) {
            res.json({
              success: true,
              msg: "Login Successfully.",
              token: token,
              admin: user
            });
          } else {
            res.json({ success: false, msg: "Your password is incorrect" });
          }
        });
      }
    });
  } catch (error) {
    res.json({ sucess: false, msg: "Something went Wrong" });
  }
};

/* ************ ADMIN SIGNIN **************** */
module.exports.adminsignin = async (req, res, next) => {
  //try {
  if (!req.body.password) {
    return res.json({ success: false, msg: "Password is required!" });
  } else if (!req.body.username) {
    return res.json({ success: false, msg: "Email is required!" });
  }

  let founduser = await Superuser.findOne({ username: req.body.username });
  if (founduser) {
    res.json({
      success: false,
      msg: "Username Already Exists!"
    });
  } else {
    let user = new Superuser({
      username: req.body.username,
      password: req.body.password
    });

    await user.save();
    res.json({ user, msg: "Admin Created Successfully." });
  }
  // } catch (e) {
  //   console.log("Error", e);
  //   res.json({ success: false,msg: "Unable to Create User!" });
  // }
};
/* ************* Admin Forget Password **************** */
module.exports.changepassword = async (req, res, next) => {
  try {
    await Superuser.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.json({
          sucess: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        //   user.comparePassword(req.body.password, async (err, isMatch) => {
        //   if (isMatch && !err) {
        let newpassword = req.body.newpassword;
        bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            res.json({ success: false, msg: err });
          }
          bcrypt.hash(newpassword, salt, null, async function(err, hash) {
            if (err) {
              res.json({ success: false, msg: err });
            }
            newpassword = hash;
            await Superuser.findOneAndUpdate(
              { username: req.body.username },
              { $set: { password: newpassword } }
            );
            res.json({
              success: true,
              msg: "Password Updated Successfully."
            });
          });
        });
        //  } else {
        //  res.json({
        //  success: false,
        //msg: "Authentication failed. Wrong password."
        //});
        //  }
        //   });
      }
    });
  } catch (err) {
    res.json({ success: false, msg: "Something went wrong" });
  }
};

/* **************Employee Signup ************ */
module.exports.employeesignup = async (req, res, next) => {
  try {
    if (!req.body.firstName) {
      return res.json({ success: false, msg: "Firstname is required!" });
    } else if (!req.body.phone) {
      return res.json({ success: false, msg: "Phone No. is required!" });
    } else if (!req.body.email) {
      return res.json({ success: false, msg: "Email is required!" });
    } else if (!req.body.restaurant_id) {
      return res.json({ success: false, msg: "Restaurant Id is required" });
    }

    let founduser = await Employee.findOne({ email: req.body.email });
    if (founduser) {
      res.json({
        success: false,
        msg: "Employee Email Address Already Exists!"
      });
    } else {
      let todaysDate = moment().format("YYYY-MM-DD");
      req.body.firstName =
        req.body.firstName
          .toLowerCase()
          .replace(/ /g, "")
          .trim() || "";
      req.body.lastName =
        req.body.lastName
          .toLowerCase()
          .replace(/ /g, "")
          .trim() || "";

      // const password = Math.random().toString().substr(2, 6)
      var password = generator.generate({ length: 10, numbers: true });
      console.log("Password is :" + password);

      var mailOptions = {
        to: req.body.email,
        from: '"Admin" <rishavsharma688777@gmail.com',
        subject: "Login Password",
        text: `Please use this password ${password}`
      };
      transporter.sendMail(mailOptions, async function(error, info) {
        if (error) {
          res.json({ sucess: false, msg: error });
        }
      });

      let employee = new Employee({
        restaurant_id: req.body.restaurant_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        phone: req.body.phone,
        dateofjoining: req.body.dateofjoining,
        jobprofile: req.body.jobprofile,
        address: req.body.address,
        createdDate: todaysDate,
        modifiedDate: todaysDate,
        isActive: false,
        password: password
      });
      await employee.save();
      res.json({ employee, msg: "Employee Created Successfully." });
    }
  } catch (e) {
    res.json({ sucess: false, msg: "Something went Wrong" });
  }
};

/* *************Employee Login *********************** */

module.exports.employeelogin = async (req, res, next) => {
  try {
    await Employee.findOne(
      { email: req.body.email.toLowerCase() },
      (err, employee) => {
        if (err) throw err;

        if (!employee) {
          res.json({ success: false, msg: "Your email is not registered" });
        } else {
          employee.comparePassword(req.body.password, async (err, isMatch) => {
            if (isMatch && !err) {
              const token = jwt.sign(employee.toJSON(), config.secret);
              await Employee.updateOne(
                { email: req.body.email },
                { isActive: true }
              ).exec();
              res.json({
                success: true,
                msg: "Login Successfully.",
                token: token,
                Employee: {
                  _id: employee._id,
                  restaurant_id: employee.restaurant_id,
                  email: employee.email,
                  phone: employee.phone,
                  firstName: employee.firstName,
                  lastName: employee.lastName,
                  jobprofile: employee.jobprofile,
                  address: employee.address
                }
              });
            } else {
              res.json({
                success: false,
                msg: "Authentication failed. Wrong password."
              });
            }
          });
        }
      }
    );
  } catch (e) {
    res.json({ sucess: false, msg: "Something went Wrong" });
  }
};

/* ************* Set Employee Password  *********************** */
module.exports.setpassword = async (req, res, next) => {
  try {
    let newpassword = req.body.newpassword;

    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        res.json({ success: false, msg: err });
      }

      bcrypt.hash(newpassword, salt, null, async function(err, hash) {
        if (err) {
          res.json({ success: false, msg: err });
        }
        newpassword = hash;
        await Employee.findOneAndUpdate(
          { email: req.body.email },
          { $set: { password: newpassword } }
        );
        res.json({ success: true, msg: "Password Updated Successfully." });
      });
    });
  } catch (e) {
    res.json({ sucess: false, msg: "Something went Wrong" });
  }
};

/* ************* fetch all Employee  *********************** */
module.exports.fetchemployee = async (req, res, next) => {
  try {
    await Employee.find(
      {},
      "_id restaurant_id firstName lastName email phone address dateofjoining jobprofile isActive status createdDate modifiedDate",
      (err, users) => {
        if (err) throw err;
        if (!users) {
          res.json({
            sucess: false,
            msg: "Authentication failed. Users not found."
          });
        } else {
          res.json({ sucess: true, users: users });
        }
      }
    ).sort({ _id: 1 });
  } catch (e) {
    res.json({ sucess: false, msg: "Something went wrong" });
  }
};

/* ************* Forget Employee Password  *********************** */
module.exports.employeeforgetpass = async (req, res, next) => {
  try {
    await Employee.find({ email: req.body.email }, async (err, employee) => {
      if (err) throw err;
      if (!employee) {
        res.json({
          success: false,
          msg:
            "We couldn't find an account with the email you entered. Please try a different email address."
        });
      } else {
        const otp_code = Math.random()
          .toString()
          .substr(2, 6);

        var mailOptions = {
          to: req.body.email,
          from: '"Admin" <rishavsharma688777@gmail.com',
          subject: "Forget Password",
          text: `Please use this OTP code to reset password ${otp_code}`
        };
        transporter.sendMail(mailOptions, async function(error, info) {
          if (error) {
            console.log("not sent bcz: " + error);
          } else {
            console.log("mail_info" + info.messageId);
          }
        });

        let timeStamp = new Date().getTime();
        let otp_expiry = timeStamp + 30 * 60 * 1000;

        await Employee.updateOne(
          { email: req.body.email },
          { $set: { otp_code: otp_code, otp_expiry: new Date(otp_expiry) } }
        );
        res.json({
          success: true,
          msg:
            "We've sent an OTP code to your email address. Please enter the code to reset your password.",
          otp: otp_code
        });
      }
    });
  } catch (err) {
    res.json({ sucess: false, msg: "Something Went Wrong" });
  }
};
/* ************* Reset Employee Password  *********************** */
module.exports.employeeresetpass = async (req, res, next) => {
  try {
    if (!req.body.otp_code || !req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        msg:
          "We couldn't find an account with the email you entered. Please try a different email address."
      });
    }
    let otp = req.body.otp_code
      .toString()
      .toLowerCase()
      .trim();

    // find user by email
    let employee = await Employee.findOne({
      otp_code: otp,
      email: req.body.email
    });
    if (!employee) {
      return res.status(400).json({
        success: false,
        msg: "You have entered an incorrect OTP code."
      });
    }
    let otp_expiry = employee["otp_expiry"];
    let current_date = new Date();

    // check for otp expiry
    if (moment(current_date).isAfter(otp_expiry)) {
      return res
        .status(400)
        .json({ success: false, msg: "Your OTP code has been expired." });
    }
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        console.log("err: ", err);
        return res.json({ success: false, msg: "Unable to Complete process!" });
      }

      bcrypt.hash(req.body.password, salt, null, async function(err, hash) {
        if (err) {
          console.log("err: ", err);
          return res.json({
            success: false,
            msg: "Unable to Complete process!"
          });
        } else {
          var result = await Employee.findOneAndUpdate(
            { email: req.body.email },
            { $set: { password: hash } },
            { new: true }
          );
          console.log("result", result);
          return res.json({
            success: true,
            msg: "Your password has been resetted Successfully.."
          });
        }
      });
    });
  } catch (err) {
    console.log(err);

    res.json({ success: false, msg: "Something went wrong" });
  }
};

/* ************* change Employee Password  *********************** */
module.exports.employeechangepass = async (req, res, next) => {
  await Employee.findOne({ email: req.body.email }, (err, employee) => {
    if (err) throw err;
    if (!employee) {
      res.json({
        success: false,
        msg: "Authentication failed. User not found."
      });
    } else {
      // check if password matches
      employee.comparePassword(req.body.password, async (err, isMatch) => {
        if (isMatch && !err) {
          let newpassword = req.body.newpassword;
          bcrypt.genSalt(10, function(err, salt) {
            if (err) {
              res.json({ success: false, msg: err });
            }
            bcrypt.hash(newpassword, salt, null, async function(err, hash) {
              if (err) {
                res.json({ success: false, msg: err });
              }
              newpassword = hash;
              await Employee.findOneAndUpdate(
                { email: req.body.email },
                { $set: { password: newpassword } }
              );
              res.json({
                success: true,
                msg: "Password Updated Successfully."
              });
            });
          });
        } else {
          res.json({
            success: false,
            msg: "Authentication failed. Wrong password."
          });
        }
      });
    }
  });
};

/* ****** Delete Employee *********** */
module.exports.delete = async (req, res, next) => {
  try {
    await Employee.findByIdAndRemove({ _id: req.params.id });
    return res.json({ success: true, msg: "data deleted" });
  } catch (err) {
    console.log(err);
    res.json({ Success: false, msg: "Something Went Wrong" });
  }
};

/* **** LOGOUT ADMIN ******** */
module.exports.logoutAdmin = async (req, res, next) => {
  try {
    await Superuser.updateOne(
      { _id: req.user._id },
      { $set: { deviceToken: req.body.devicetoken } }
    );
    res.json({ success: true, msg: "You has been logout Successfully!" });
  } catch (e) {
    console.log("error", e);
    res.json({ success: false, msg: "Something went wrong!" });
  }
};

/* **** LOGOUT Empolyeeeee ******** */
module.exports.logoutEmpolyee = async (req, res, next) => {
  try {
    await Employee.updateOne(
      { _id: req.user._id },
      { $set: { deviceToken: req.body.devicetoken } }
    );
    res.json({ success: true, msg: "You has been logout Successfully!" });
  } catch (e) {
    console.log("error", e);
    res.json({ success: false, msg: "Something went wrong!" });
  }
};
