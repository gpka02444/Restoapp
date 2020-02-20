const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// load up the user model
const Onwer = require('../src/models/employee');
const Superuser = require('../src/models/admin');
const User = require('../src/models/user');

const config = require('../src/config').env //get db config file
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
opts.secretOrKey = config.secret

module.exports = (passport) => {
 passport.use(
   new JwtStrategy(opts, (jwtPayload, done) => {

    Onwer.findOne({_id: jwtPayload._id}, (err, user) => {      
      if (err) {
         return done(err, false)
            }
         if (user) {
              if(user.blocked === 'true'){
                done(null, false)
              }else{
                done(null, user)
              }
            }
         
          
          })
    })
    );
};
 // else {
          //  Superuser.findOne({_id: jwtPayload._id}, (err, suser) => {      
          //       if (err) {
          //         return done(err, false)
          //       }
          //       if (suser) {
          //         if(suser.blocked === 'true'){
          //           done(null, false)
          //         }else{
          //           done(null, suser)
          //         }
          //       } else {
          //         done(null, false)
          //       } 
          //     })
          //   } 



// passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
//   User.find({_id: jwtPayload._id}, (err, user) => {
//     if(err){
//       return done(err, false)
//     }
//     else if (user){
//       if(user.blocked === 'true'){
//         done(null, false)
//       }else{
//         done(null, user)
//       } 
//     }
//   })
// }))
