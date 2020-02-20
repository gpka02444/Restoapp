const Notification = require('../models/notificatoions');

const client = require('twilio')
('AC8916123a6db208dee3a701b3780b0c10', '310e490285e6cfd1d970574f918e6d9e')



module.exports.sendSms= async (req, res, next) => {
    try {
        console.log(req.body.message);
        client.messages.create({
            from: '+14243737263',
            to: req.body.number,
            body: req.body.message
        }).then((response) => {
            if (response.errorCode) {
              res.json({ success: false, msg: "SMS not delivered.", systemMsg: response.errorMessage })
            } else {
              res.json({ success: true, msg: "SMS delivered.", systemMsg: response })
            }
          });   
    } catch (e) {
        console.log(e);
        res.json({ success: false, msg: "Something went wrong !" })
        
    }
}
