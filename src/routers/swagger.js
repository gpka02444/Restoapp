/**
 * @swagger
 * definition:
 *  superuserlogin:
 *    properties:
 *      email:
 *        example: 'example@mail.com'
 *        type: string
 *      password:
 *        example: '123'
 *        type: string
 * /superuserlogin:
 *   post:
 *     tags:
 *       - Admin
 *     description: Admin Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: signin
 *         description: Login into system
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/superuserlogin'
 *     responses:
 *       200:
 *         description: Successfully Loged in
 */ 


/**
 * @swagger
 * definition:
 *  editusername:
 *    properties:
 *      email:
 *        example: 'example@mail.com'
 *        type: string
 *      password:
 *        example: "1000"
 *        type: String
 *      username:
 *        example: 'example'
 *        type: string
 * /users/editusername:
 *   post:
 *     security:
 *       - JWT: []
 *     tags:
 *       - users
 *     description: user editusername
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: edituser
 *         description: user editusername
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/editusername'
 *     responses:
 *       200:
 *         description: Username Updated Successfully
 */

/**
 * @swagger
 * definition:
 *  Adminchangepassword:
 *   properties:
 *     username: 
 *       example: "admin"
 *       type: String
 *     newpassword:
 *        example: "123456"
 *        type: String
 * /adminchangepassword:
 *   post:
 *     security:
 *       - JWT:  {
 *         type: 'apiKey',
 *         description: 'JWT authorization of an API',
 *         in: 'header',
 *     name: 'Authorization'
 *    }
 *     tags:
 *       - Admin
 *     description: Admin changepassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: changepassword
 *         description: Admin changepassword
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Adminchangepassword'
 *     responses:
 *       200:
 *         description: Password changed Successfully
 */


// /**
// * @swagger
// * definition:
// *  getguesttoken:
// *    properties:
// * /users/getguesttoken:
// *   post:
// *     tags:
// *       - users
// *     description: Guest Login
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: getguesttoken
// *         description: Login into system
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/getguesttoken'
// *     responses:
// *       200:
// *         description: Successfully Loged in
// */

// /**
//  * @swagger
//  * definition:
//  *  signup:
//  *    properties:
//  *      email:
//  *        example: 'example@mail.com'
//  *        type: string
//  *      password:
//  *        example: "1000"
//  *        type: String
//  *      firstName:
//  *        example: 'example'
//  *        type: string
//  *      lastName:
//  *        example: 'example'
//  *        type: string
//  *      city:
//  *        example: 'example'
//  *        type: string
//  *      country:
//  *        example: 'example'
//  *        type: string
//  *      countryCode:
//  *        example: '+91'
//  *        type: string
//  *      gender:
//  *        example: 'male'
//  *        type: string
//  *      dob:
//  *        example: '12345'
//  *        type: number
//  *      phone:
//  *        example: '12324654'
//  *        type: string
//  *      userimage:
//  *        example: 'https://firebasestorage.googleapis.com/v0/b/meem-fcc73.appspot.com/o/storage%2Femulated%2F0%2FWhatsApp%2FMedia%2FWhatsApp%20Images%2FIMG-20190824-WA0049.jpg1567060709209.jpg?alt=media&token=7205bc4b-897a-4746-8aa5-7d2533c325a8'
//  *        type: string
//  * /users/signup:
//  *   post:
//  *     tags:
//  *       - users
//  *     description: user signup
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: signup
//  *         description: user signup
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/signup'
//  *     responses:
//  *       200:
//  *         description: User Created Successfully
//  */

// /**
//  * @swagger
//  * definition:
//  *  edituser:
//  *    properties:
//  *      email:
//  *        example: 'example@mail.com'
//  *        type: string
//  *      password:
//  *        example: "1000"
//  *        type: String
//  *      firstName:
//  *        example: 'example'
//  *        type: string
//  *      lastName:
//  *        example: 'example'
//  *        type: string
//  *      city:
//  *        example: 'example'
//  *        type: string
//  *      country:
//  *        example: 'example'
//  *        type: string
//  *      countryCode:
//  *        example: '+91'
//  *        type: string
//  *      gender:
//  *        example: 'male'
//  *        type: string
//  *      dob:
//  *        example: '12345'
//  *        type: number
//  *      phone:
//  *        example: '12324654'
//  *        type: string
//  * /users/edituser:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: user edituser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: edituser
//  *         description: user edituser
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/edituser'
//  *     responses:
//  *       200:
//  *         description: User Created Successfully
//  */

/**
 * @swagger
 * definition:
 *  editusername:
 *    properties:
 *      email:
 *        example: 'example@mail.com'
 *        type: string
 *      password:
 *        example: "1000"
 *        type: String
 *      username:
 *        example: 'example'
 *        type: string
 * /users/editusername:
 *   post:
 *     security:
 *       - JWT: []
 *     tags:
 *       - users
 *     description: user editusername
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: edituser
 *         description: user editusername
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/editusername'
 *     responses:
 *       200:
 *         description: Username Updated Successfully
 */

/**
 * @swagger
 * definition:
 *  changepassword:
 *    properties:
 *      email:
 *        example: 'example@mail.com'
 *        type: string
 *      password:
 *        example: "1000"
 *        type: String
 *      newpassword:
 *        example: "10001"
 *        type: String
 * /changepassword:
 *   post:
 *     security:
 *       - JWT:  {
 *         type: 'apiKey',
 *         description: 'JWT authorization of an API',
 *         in: 'header',
 *     name: 'Authorization'
 *    }
 *     tags:
 *       - Admin
 *     description: user changepassword
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: changepassword
 *         description: Admin changepassword
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/changepassword'
 *     responses:
 *       200:
 *         description: Password changed Successfully
 */

/**
 * @swagger
 * definition:
 *  forgetpassword:
 *    properties:
 *      email:
 *        example: 'example@mail.com'
 *        type: string
 * /forgetpassword:
 *   post:
 *     security:
 *       - JWT:  {
 *         type: 'apiKey',
 *         description: 'JWT authorization of an API',
 *         in: 'header',
 *     name: 'Authorization'
 *    }
 *     tags:
 *       - Admin
 *     description: forget password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: forgetpassword
 *         description: forget password
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/forgetpassword'
 *     responses:
 *       200:
 *         description: Forget Email Sent Successfully
 */

/**
 * @swagger
 *  /approvedusers :
 *   get:
 *     security:
 *       - JWT: []
 *     tags:
 *       - Admin
 *     description: approveduser
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Approved Users List
 */

/**
 * @swagger
 *  /pending :
 *   get:
 *     security:
 *       - JWT: []
 *     tags:
 *       - Admin
 *     description: Pendinguser
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Pending Users List
 */

// /**
// * @swagger
// * definition:
// *  searchuser:
// *    properties:
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// *      username:
// *        example: 'example'
// *        type: string
// * /users/searchuser:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: searchuser
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: searchuser
// *         description: searchuser
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/searchuser'
// *     responses:
// *       200:
// *         description: user
// */

// /**
//  * @swagger
//  * definition:
//  *  fetchuser:
//  *    properties:
//  *      userid:
//  *        example: '5bd89bfed620b92d5c6508d4'
//  *        type: string
//  *      fetchedby:
//  *        example: '5bd89bfed620b92d5c6508d4'
//  *        type: string
//  * /users/fetchuser:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: fetchuser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: fetchuser
//  *         description: fetchuser
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/fetchuser'
//  *     responses:
//  *       200:
//  *         description: user
//  */

// /**
//  * @swagger
//  * definition:
//  *  fetchuserdetails:
//  *    properties:
//  *      userid:
//  *        example: '5bd89bfed620b92d5c6508d4'
//  *        type: string
//  * /users/fetchuserdetails:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: fetchuserdetails
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: fetchuserdetails
//  *         description: fetchuserdetails
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/fetchuserdetails'
//  *     responses:
//  *       200:
//  *         description: user
//  */

// /**
//  * @swagger
//  * definition:
//  *  fetchalluser:
//  *    properties:
//  *      page:
//  *        example: 0
//  *        type: number
//  *      limit:
//  *        example: 5
//  *        type: number
//  * /users/fetchalluser:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: fetchalluser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: fetchalluser
//  *         description: fetchalluser
//  *         in: body
//  *         required: false
//  *         schema:
//  *           $ref: '#/definitions/fetchalluser'
//  *     responses:
//  *       200:
//  *         description: user
//  */

// /**
//  * @swagger
//  * definition:
//  *  fetchallblockeduser:
//  *    properties:
//  *      page:
//  *        example: 0
//  *        type: number
//  *      limit:
//  *        example: 5
//  *        type: number
//  * /users/fetchallblockeduser:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: fetchallblockeduser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: fetchallblockeduser
//  *         description: fetchallblockeduser
//  *         in: body
//  *         required: false
//  *         schema:
//  *           $ref: '#/definitions/fetchallblockeduser'
//  *     responses:
//  *       200:
//  *         description: user
//  */

// /**
//  * @swagger
//  * definition:
//  *  fetchuserblocklist:
//  *    properties:
//  *      userid:
//  *        example: '5bd89bfed620b92d5c6508d4'
//  *        type: string
//  * /users/fetchuserblocklist:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: fetchuserblocklist
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: fetchuserblocklist
//  *         description: fetchuserblocklist
//  *         in: body
//  *         required: false
//  *         schema:
//  *           $ref: '#/definitions/fetchuserblocklist'
//  *     responses:
//  *       200:
//  *         description: user
//  */

// /**
//  * @swagger
//  * definition:
//  *  followuser:
//  *    properties:
//  *      followed:
//  *        example: '5bd89bfed620b92d5c6508d4'
//  *        type: string
//  *      followedBy:
//  *        example: '5bd803325a7a65194c074153'
//  *        type: string
//  * /users/followuser:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: followuser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: followuser
//  *         description: followuser
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/followuser'
//  *     responses:
//  *       200:
//  *         description: user
//  */
// /**
//  * @swagger
//  * definition:
//  *  unfollowuser:
//  *    properties:
//  *      unfollowed:
//  *        example: '5bd89bfed620b92d5c6508d4'
//  *        type: string
//  *      unfollowedBy:
//  *        example: '5bd803325a7a65194c074153'
//  *        type: string
//  * /users/unfollowuser:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: unfollowuser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: unfollowuser
//  *         description: unfollowuser
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/unfollowuser'
//  *     responses:
//  *       200:
//  *         description: user
//  */

// /**
// * @swagger
// * definition:
// *  deleteuser:
// *    properties:
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/deleteuser:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: deleteuser
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: deleteuser
// *         description: deleteuser
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/deleteuser'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  blockuser:
// *    properties:
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/blockuser:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: blockuser
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: blockuser
// *         description: blockuser
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/blockuser'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
//  * @swagger
//  * definition:
//  *  blockuserspecific:
//  *    properties:
//  *      userid:
//  *        example: '5bd803325a7a65194c074153'
//  *        type: string
//  *      blockuserid:
//  *        example: '5bd803325a7a65194c074156'
//  *        type: string
//  * /users/blockuserspecific:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: blockuserspecific
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: blockuserspecific
//  *         description: blockuserspecific
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/blockuserspecific'
//  *     responses:
//  *       200:
//  *         description: Success
//  */

// /**
//  * @swagger
//  * definition:
//  *  unblockuserspecific:
//  *    properties:
//  *      userid:
//  *        example: '5bd803325a7a65194c074153'
//  *        type: string
//  *      unblockuserid:
//  *        example: '5bd803325a7a65194c074156'
//  *        type: string
//  * /users/unblockuserspecific:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: unblockuserspecific
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: unblockuserspecific
//  *         description: unblockuserspecific
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/unblockuserspecific'
//  *     responses:
//  *       200:
//  *         description: Success
//  */

// /**
// * @swagger
// * definition:
// *  unblockuser:
// *    properties:
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/unblockuser:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: unblockuser
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: unblockuser
// *         description: unblockuser
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/unblockuser'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
//  * @swagger
//  * definition:
//  *  switchlocation:
//  *    properties:
//  *      userid:
//  *        example: '5bd803325a7a65194c074153'
//  *        type: String
//  * /users/switchlocation:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: switchlocation
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: switchlocation
//  *         description: switchlocation
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/switchlocation'
//  *     responses:
//  *       200:
//  *         description: Success
//  */

// /**
// * @swagger
// * definition:
// *  fetchprivacypolicy:
// *    properties:
// *      page:
// *        example: 0
// *        type: string
// * /users/fetchprivacypolicy:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: fetchprivacypolicy
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchprivacypolicy
// *         description: fetchprivacypolicy
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/fetchprivacypolicy'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  fetchtotals:
// *    properties:
// *      page:
// *        example: 0
// *        type: string
// * /users/fetchtotals:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: fetchtotals
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchtotals
// *         description: fetchtotals
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/fetchtotals'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  previousdaytotals:
// *    properties:
// *      page:
// *        example: 0
// *        type: string
// * /users/previousdaytotals:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: previousdaytotals
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: previousdaytotals
// *         description: previousdaytotals
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/previousdaytotals'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  fetchtermsandconditions:
// *    properties:
// *      page:
// *        example: 0
// *        type: string
// * /users/fetchtermsandconditions:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: fetchtermsandconditions
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchtermsandconditions
// *         description: fetchtermsandconditions
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/fetchtermsandconditions'
// *     responses:
// *       200:
// *         description: Success
// */
// /**
// * @swagger
// * definition:
// *  fetchcontactus:
// *    properties:
// *      page:
// *        example: 0
// *        type: string
// *      limit:
// *        example: 5
// *        type: string
// * /users/fetchcontactus:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: fetchcontactus
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchcontactus
// *         description: fetchcontactus
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/fetchcontactus'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  updateprivacypolicy:
// *    properties:
// *      privacypolicy:
// *        example: 'this is a policy'
// *        type: string
// *      id:
// *        example: 't5c334802cb97d32c18fb6409'
// *        type: string
// * /users/updateprivacypolicy:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: updateprivacypolicy
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: updateprivacypolicy
// *         description: updateprivacypolicy
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/updateprivacypolicy'
// *     responses:
// *       200:
// *         description: Success
// */
// /**
// * @swagger
// * definition:
// *  updatetermsandconditions:
// *    properties:
// *      termsandconditions:
// *        example: 'these are termsandconditions'
// *        type: string
// *      id:
// *        example: 't5c334802cb97d32c18fb6409'
// *        type: string
// * /users/updatetermsandconditions:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: updatetermsandconditions
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: updatetermsandconditions
// *         description: updatetermsandconditions
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/updatetermsandconditions'
// *     responses:
// *       200:
// *         description: Success
// */
// /**
// * @swagger
// * definition:
// *  updatecontactus:
// *    properties:
// *      text:
// *        example: 'these are contact us'
// *        type: string
// *      subject:
// *        example: 'these are subject'
// *        type: string
// *      userid:
// *        example: 't5c334802cb97d32c18fb6409'
// *        type: string
// * /users/updatecontactus:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: updatecontactus
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: updatecontactus
// *         description: updatecontactus
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/updatecontactus'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  replycontactus:
// *    properties:
// *      text:
// *        example: 'these are contact us'
// *        type: string
// *      email:
// *        example: 'example@mail.com'
// *        type: string
// * /users/replycontactus:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: replycontactus
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: replycontactus
// *         description: replycontactus
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/replycontactus'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  creatememe:
// *    properties:
// *      meme:
// *        example: 'https://firebasestorage.googleapis.com/v0/b/meem-fcc73.appspot.com/o/meme%2F9B3985DF-E203-4298-9E23-639425247EA2.png?alt=media&token=144ad457-122c-4c1c-9197-9c219d341cb6'
// *        type: string
// *      text:
// *        example: 'example text #cool #great'
// *        type: string
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/creatememe:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: creatememe
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: creatememe
// *         description: creatememe
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/creatememe'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  uploaduserimage:
// *    properties:
// *      userimage:
// *        example: 'https://firebasestorage.googleapis.com/v0/b/meem-fcc73.appspot.com/o/storage%2Femulated%2F0%2FWhatsApp%2FMedia%2FWhatsApp%20Images%2FIMG-20190824-WA0049.jpg1567060709209.jpg?alt=media&token=7205bc4b-897a-4746-8aa5-7d2533c325a8'
// *        type: string
// * /users/uploaduserimage:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: uploaduserimage
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: uploaduserimage
// *         description: uploaduserimage
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/uploaduserimage'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  logout:
// *    properties:
// *      devicetoken:
// *        example: 'asdsadas:adasdsadaskdhdkjashdkjashdkashdaskjd'
// *        type: string
// * /users/logout:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: logout user from device
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: devicetoken
// *         description: user device token
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/logout'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  createadminmeme:
// *    properties:
// *      meme:
// *        example: 'https://firebasestorage.googleapis.com/v0/b/meem-fcc73.appspot.com/o/meme%2F9B3985DF-E203-4298-9E23-639425247EA2.png?alt=media&token=144ad457-122c-4c1c-9197-9c219d341cb6'
// *        type: string
// *      text:
// *        example: 'example text #cool #great'
// *        type: string
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/createadminmeme:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: createadminmeme
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: createadminmeme
// *         description: createadminmeme
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/createadminmeme'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  fetchmeme:
// *    properties:
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// * /users/fetchmeme:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: fetchmeme
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchmeme
// *         description: fetchmeme
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/fetchmeme'
// *     responses:
// *       200:
// *         description: Success
// */
// /**
// * @swagger
// * definition:
// *  fetchadminmeme:
// *    properties:
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// * /users/fetchadminmeme:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: fetchadminmeme
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchadminmeme
// *         description: fetchadminmeme
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/fetchadminmeme'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  deleteadminmeme:
// *    properties:
// *      memeid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/deleteadminmeme:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: deleteadminmeme
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: deleteadminmeme
// *         description: deleteadminmeme
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/deleteadminmeme'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  deleteusermeme:
// *    properties:
// *      memeid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/deleteusermeme:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: deleteusermeme
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: deleteusermeme
// *         description: deleteusermeme
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/deleteusermeme'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  fetchmemebyid:
// *    properties:
// *      memeid:
// *        example: '5c078cb78592c6209fa4fbfd'
// *        type: string
// *      userid:
// *        example: '5c078c8cc1e1a03b0cd6dda1'
// *        type: string
// * /users/fetchmemebyid:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: fetchmemebyid
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchmemebyid
// *         description: fetchmemebyid
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/fetchmemebyid'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  hotmeme:
// *    properties:
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// * /users/hotmeme:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: hotmeme
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: hotmeme
// *         description: hotmeme
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/hotmeme'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  getrandomnumber:
// *    properties:
// *      phone:
// *        example: '123456798'
// *        type: string
// * /users/getrandomnumber:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: getrandomnumber
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: getrandomnumber
// *         description: getrandomnumber
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/getrandomnumber'
// *     responses:
// *       200:
// *         description: Random Number
// */

// /**
// * @swagger
// * definition:
// *  searchtag:
// *    properties:
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// *      tag:
// *        example: '#great'
// *        type: string
// * /users/searchtag:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: searchtag
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: searchtag
// *         description: searchtag
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/searchtag'
// *     responses:
// *       200:
// *         description: memes
// */

// /**
// * @swagger
// * definition:
// *  likememe:
// *    properties:
// *      memeid:
// *        example: '5bdd512e2ef45645eccab935'
// *        type: string
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/likememe:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: likememe
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: likememe
// *         description: likememe
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/likememe'
// *     responses:
// *       200:
// *         description: memes
// */

// /**
// * @swagger
// * definition:
// *  dislikememe:
// *    properties:
// *      memeid:
// *        example: '5bdd512e2ef45645eccab935'
// *        type: string
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// * /users/dislikememe:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: dislikememe
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: dislikememe
// *         description: dislikememe
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/dislikememe'
// *     responses:
// *       200:
// *         description: memes
// */

// /**
// * @swagger
// * definition:
// *  commentmeme:
// *    properties:
// *      memeid:
// *        example: '5bdd512e2ef45645eccab935'
// *        type: string
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// *      comment:
// *        example: 'this is example comment'
// *        type: string
// * /users/commentmeme:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: commentmeme
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: commentmeme
// *         description: commentmeme
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/commentmeme'
// *     responses:
// *       200:
// *         description: memes
// */

// /**
// * @swagger
// * definition:
// *  mymemelist:
// *    properties:
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// * /users/mymemelist:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: mymemelist
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: mymemelist
// *         description: mymemelist
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/mymemelist'
// *     responses:
// *       200:
// *         description: memes
// */

// /**
// * @swagger
// * definition:
// *  memeuserliked:
// *    properties:
// *      userid:
// *        example: '5bd803325a7a65194c074153'
// *        type: string
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// * /users/memeuserliked:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Memes
// *     description: memeuserliked
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: memeuserliked
// *         description: memeuserliked
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/memeuserliked'
// *     responses:
// *       200:
// *         description: memes
// */

// /**
// * @swagger
// * definition:
// *  fetchnotifications:
// *    properties:
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// * /users/fetchnotifications:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Notifications
// *     description: fetchnotifications
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchnotifications
// *         description: fetchnotifications
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/fetchnotifications'
// *     responses:
// *       200:
// *         description: Notifications
// */

// /**
// * @swagger
// * definition:
// *  readmarknotifications:
// *    properties:
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// * /users/readmarknotifications:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - Notifications
// *     description: readmarknotifications
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: readmarknotifications
// *         description: readmarknotifications
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/readmarknotifications'
// *     responses:
// *       200:
// *         description: Notifications
// */

// /**
//   * @swagger
//   * definition:
//   *  mostusedtag:
//   *    properties:
//   *      page:
//   *        example: 0
//   *        type: number
//   *      limit:
//   *        example: 5
//   *        type: number
//   * /users/mostusedtag:
//   *   post:
//   *     security:
//   *       - JWT: []
//   *     tags:
//   *       - Memes
//   *     description: mostusedtag
//   *     produces:
//   *       - application/json
//   *     parameters:
//   *       - name: mostusedtag
//   *         description: mostusedtag
//   *         in: body
//   *         required: true
//   *         schema:
//   *           $ref: '#/definitions/mostusedtag'
//   *     responses:
//   *       200:
//   *         description: Success
//   */

// /**
//   * @swagger
//   * definition:
//   *  fetchcommentbymeme:
//   *    properties:
//   *      memeid:
//   *        example: '5bd803325a7a65194c074153'
//   *        type: string
//   *      page:
//   *        example: 0
//   *        type: number
//   *      limit:
//   *        example: 5
//   *        type: number
//   * /users/fetchcommentbymeme:
//   *   post:
//   *     security:
//   *       - JWT: []
//   *     tags:
//   *       - Memes
//   *     description: fetchcommentbymeme
//   *     produces:
//   *       - application/json
//   *     parameters:
//   *       - name: fetchcommentbymeme
//   *         description: fetchcommentbymeme
//   *         in: body
//   *         required: true
//   *         schema:
//   *           $ref: '#/definitions/fetchcommentbymeme'
//   *     responses:
//   *       200:
//   *         description: Success
//   */

// /**
//  * @swagger
//  * definition:
//  *  addsuperuser:
//  *    properties:
//  *      name:
//  *        example: "example"
//  *        type: String
//  *      email:
//  *        example: 'example@mail.com'
//  *        type: string
//  *      password:
//  *        example: "1000"
//  *        type: String
//  *      role:
//  *        example: "admin"
//  *        type: String
//  * /users/addsuperuser:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: superuser creation
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: addsuperuser
//  *         description: superuser creation
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/addsuperuser'
//  *     responses:
//  *       200:
//  *         description: Superuser Created Successfully
//  */

// /**
// * @swagger
// * definition:
// *  fetchAllSuperUser:
// *    properties:
// *
// * /users/fetchAllSuperUser:
// *   get:
// *     tags:
// *       - users
// *     description: fetchAllSuperUser
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: fetchAllSuperUser
// *         description: fetchAllSuperUser
// *         in: body
// *         required: false
// *         schema:
// *           $ref: '#/definitions/fetchAllSuperUser'
// *     responses:
// *       200:
// *         description: Success
// */

// /**
//   * @swagger
//   * definition:
//   *  editSuperuser:
//   *    properties:
//   *      email:
//   *        example: 'example@mail.com'
//   *        type: string
//   *      password:
//   *        example: "1000"
//   *        type: String
//   *      name:
//   *        example: 'example'
//   *        type: string
//   *      role:
//   *        example: "admin"
//   *        type: String
//   * /users/editSuperuser:
//   *   post:
//   *     security:
//   *       - JWT: []
//   *     tags:
//   *       - users
//   *     description: editSuperuser
//   *     produces:
//   *       - application/json
//   *     parameters:
//   *       - name: edituser
//   *         description: editSuperuser
//   *         in: body
//   *         required: true
//   *         schema:
//   *           $ref: '#/definitions/editSuperuser'
//   *     responses:
//   *       200:
//   *         description: Superuser Updated Successfully
//   */

// /**
//   * @swagger
//   * definition:
//   *  deleteSuperuser:
//   *    properties:
//   *      _id:
//   *        example: 'ObjectId'
//   *        type: string
//   * /users/editSuperuser:
//   *   post:
//   *     security:
//   *       - JWT: []
//   *     tags:
//   *       - users
//   *     description: deleteSuperuser
//   *     produces:
//   *       - application/json
//   *     parameters:
//   *       - name: edituser
//   *         description: deleteSuperuser
//   *         in: body
//   *         required: true
//   *         schema:
//   *           $ref: '#/definitions/deleteSuperuser'
//   *     responses:
//   *       200:
//   *         description: Superuser Deleted Successfully
//   */

// /**
//   * @swagger
//   * definition:
//   *  updateBlockedSuperuser:
//   *    properties:
//   *      _id:
//   *        example: 'ObjectId'
//   *        type: string
//   *      blocked:
//   *        example: "true"
//   *        type: String
//   * /users/updateBlockedSuperuser:
//   *   post:
//   *     security:
//   *       - JWT: []
//   *     tags:
//   *       - users
//   *     description: updateBlockedSuperuser
//   *     produces:
//   *       - application/json
//   *     parameters:
//   *       - name: edituser
//   *         description: updateBlockedSuperuser
//   *         in: body
//   *         required: true
//   *         schema:
//   *           $ref: '#/definitions/updateBlockedSuperuser'
//   *     responses:
//   *       200:
//   *         description: Superuser Blocked Changes Successfully
//   */

// /**
//  * @swagger
//  * definition:
//  *  superuserLogin:
//  *    properties:
//  *      email:
//  *        example: 'example@mail.com'
//  *        type: string
//  *      devicetoken:
//  *        example: 'eoTF9Y9vgCA:APA91bG2rYCCP-56hvRhr3eL0QK6cJ65AA0iANkSlIM1H5Ms8qUE5X4ksgtaYiZgH86GdKrUNCdjaHzcELP4Pl4FLlXwK-IsjaKAmTzOKcxvE9_rNa_9osZj97jceue5nz8B4yb'
//  *        type: string
//  *      password:
//  *        example: '123456'
//  *        type: string
//  * /users/signin:
//  *   post:
//  *     tags:
//  *       - users
//  *     description: Login Superuser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: superuserLogin
//  *         description: Login into system
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/superuserLogin'
//  *     responses:
//  *       200:
//  *         description: Successfully Logged in
//  */

// /**
//  * @swagger
//  * definition:
//  *  facebooksignin:
//  *    properties:
//  *      userId:
//  *        example: 'asdasd46445'
//  *        type: string
//  *      email:
//  *        example: 'example@mail.com'
//  *        type: string
//  *      name:
//  *        example: 'test_name'
//  *        type: string
//  *      phonenumber:
//  *        example: '123464645'
//  *        type: string
//  * /users/facebooksignin:
//  *   post:
//  *     tags:
//  *       - users
//  *     description: Login Superuser
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: facebooksignin
//  *         description: Login into system
//  *         in: body
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/facebooksignin'
//  *     responses:
//  *       200:
//  *         description: Successfully Logged in
//  */

// /**
//  * @swagger
//  * definition:
//  *  sendsms:
//  *    properties:
//  *      number:
//  *        example: '+17737504818'
//  *        type: string
//  *      message:
//  *        example: 'Hi hello'
//  *        type: string
//  * /users/sendsms:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: sendsms
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: sendsms
//  *         description: sendsms
//  *         in: body
//  *         required: false
//  *         schema:
//  *           $ref: '#/definitions/sendsms'
//  *     responses:
//  *       200:
//  *         description: SMS
//  */

// /**
//  * @swagger
//  * definition:
//  *  notify:
//  *    properties:
//  *      broadcast:
//  *        example: false
//  *        type: boolean
//  *      token:
//  *        example: ['safassadsa']
//  *        type: array
//  *      notificationTitle:
//  *        example: 'title'
//  *        type: string
//  *      notificationBody:
//  *        example: 'body'
//  *        type: string
//  * /users/notify:
//  *   post:
//  *     security:
//  *       - JWT: []
//  *     tags:
//  *       - users
//  *     description: notify
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: notify
//  *         description: notify
//  *         in: body
//  *         required: false
//  *         schema:
//  *           $ref: '#/definitions/notify'
//  *     responses:
//  *       200:
//  *         description: notify
//  */

// /**
// * @swagger
// * /users/total_meme_uploaded:
// *   get:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: total_meme_uploaded
// *     produces:
// *       - application/json
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * /users/my_total_meme_uploaded:
// *   get:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: my_total_meme_uploaded
// *     produces:
// *       - application/json
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * /users/most_followed_user:
// *   get:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: most_followed_user
// *     produces:
// *       - application/json
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * /users/most_popular_meme:
// *   get:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: most_popular_meme
// *     produces:
// *       - application/json
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * /users/most_trending_hashtags:
// *   get:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: most_trending_hashtags
// *     produces:
// *       - application/json
// *     responses:
// *       200:
// *         description: Success
// */

// /**
// * @swagger
// * definition:
// *  fetchmemesbyhashtag:
// *    properties:
// *      page:
// *        example: 0
// *        type: number
// *      limit:
// *        example: 5
// *        type: number
// *      hashtag:
// *        example: 'example'
// *        type: string
// * /users/fetchmemesbyhashtag:
// *   post:
// *     security:
// *       - JWT: []
// *     tags:
// *       - users
// *     description: fetchmemesbyhashtag
// *     produces:
// *       - application/json
// *     parameters:
// *       - name: hashtag
// *         description: hashtag
// *         in: body
// *         required: true
// *         schema:
// *           $ref: '#/definitions/fetchmemesbyhashtag'
// *     responses:
// *       200:
// *         description: Success
// */
