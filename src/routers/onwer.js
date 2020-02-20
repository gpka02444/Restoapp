var express = require("express");
const router = express.Router();
const passport = require("passport");
require("../../auth/passport")(passport);
const userCtrl = require("../controllers/onwer");
const superuser = require("./../controllers/admin");
const category = require("./../controllers/category");
const expressJoi = require("express-joi-validator");
const multer = require("multer");
const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  }
});
const checkAuth = require("../../auth/validatetoken").validateToken;

let device_check_middleware = (req, res, next) => {
  return next();
};

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.signin);
router.post("/facebooksignin", userCtrl.facebooksignin);
router.post(
  "/forgetpassword",
  checkAuth,
  device_check_middleware,
  userCtrl.forgetpassword
);
router.post("/resetpassword", checkAuth, userCtrl.resetpassword);
router.post("/changepassword", checkAuth, userCtrl.changepassword);

router.post(
  "/employeesignup",
  device_check_middleware,
  superuser.employeesignup
);
router.post("/employeelogin", device_check_middleware, superuser.employeelogin);
router.post("/setpassword", checkAuth, superuser.setpassword);
router.get("/fetchallemployee", checkAuth, superuser.fetchemployee);
router.post("/employeeforgetpass", checkAuth, superuser.employeeforgetpass);
router.post("/employeeresetpass", checkAuth, superuser.employeeresetpass);
router.post("/employeechangepass", checkAuth, superuser.employeechangepass);
router.delete("/deleteemployee/:id", superuser.delete);

router.post("/createcategory", checkAuth, category.createcategory);
router.post("/createsubcategory", checkAuth, category.createsubcategory);
router.get("/fetchcategory/:id", category.fetchcategory);
router.delete("/deletecategory/:id", checkAuth, category.deletecategory);
router.delete("/deletesubcategory/:id", checkAuth, category.deletesubcategory);
router.post("/updatecategory/:id", checkAuth, category.updatecategory);
router.post("/updatesubcategory/:id", checkAuth, category.updatesubcategory);

router.post("/userlogin", userCtrl.userlogin);
router.post("/usersignup", userCtrl.usersignup);
router.post("/facebooksignin", userCtrl.facebooksignin);
router.post("/googlesignin", userCtrl.googlesignin);
router.post("/userforgetpassword", checkAuth, userCtrl.userforgetpassword);
router.post("/userresetpassword", checkAuth, userCtrl.userresetpassword);
router.post("/userchangepassword", checkAuth, userCtrl.userchangepassword);
router.post("/edituser/:id", checkAuth, userCtrl.edituser);
router.post(
  "/uploadimage/:id",
  checkAuth,
  upload.single("userImage"),
  userCtrl.uploadimage
);
router.get("/fetchmenu", checkAuth, category.fetchMenu);
router.get("/search", category.search);

/* *********** LOGOUT **************** */
router.post("/logoutAdmin/:id", superuser.logoutAdmin);
router.post("/logoutOwner/:id", userCtrl.logoutOwner);
router.post("/logoutEmpolyee/:id", superuser.logoutEmpolyee);
router.post("/logoutUser/:id", userCtrl.logoutUser);

module.exports = router;
