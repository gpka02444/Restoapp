var express = require("express");
const router = express.Router();
const superuser = require("./../controllers/admin");
const userCtrl = require("../controllers/onwer");
const notificationController = require("./../controllers/Notifications");
const checkAuth = require("../../auth/validatetoken").validateToken;


let device_check_middleware = (req, res, next) => { 
  if(!req.session.superuser) {
  return res.status(401).send();
  } else {
    return res.status(200).send("Welcome")
  }
};

router.post("/superuserlogin", superuser.login);

router.post("/adminsignin", device_check_middleware, superuser.adminsignin);
router.post(
  "/adminchangepassword",
  device_check_middleware,
  superuser.changepassword
);
router.get("/pending", checkAuth, device_check_middleware, userCtrl.pending);
router.get(
  "/approvedusers",
  checkAuth,
  device_check_middleware,
  userCtrl.approvedusers
);
router.put(
  "/approved/:id",
  checkAuth,
  device_check_middleware,
  userCtrl.approved
);
router.delete(
  "/rejected/:id",
  checkAuth,
  device_check_middleware,
  userCtrl.rejected
);
router.post(
  "/sendsms",
  checkAuth,
  device_check_middleware,
  notificationController.sendSms
);
router.post(
  "/blockowner/:id",
  checkAuth,
  device_check_middleware,
  userCtrl.blocked
);
router.post(
  "/unblockowner/:id",
  checkAuth,
  device_check_middleware,
  userCtrl.unblocked
);

module.exports = router;
