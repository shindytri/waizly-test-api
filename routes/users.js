const express = require("express")
const router = express.Router()
const {
    registerUser, 
    getDataUser, 
    getDataUserbyId, 
    editUser,
    deleteUser} = require('../controllers/users-controller')
const {basicAuth} = require("../middleware/authentication")
router.use(express.json())

// CREATE USER
router.route("/user_management").post(basicAuth,registerUser)
// READ USER
router.route("/user_management").get(basicAuth,getDataUser)
router.route("/user_management/:id").get(basicAuth,getDataUserbyId)
// UPDATE USER
router.route("/user_management/:id").patch(basicAuth,editUser)
// DELETE USER
router.route("/user_management/:id").delete(basicAuth,deleteUser)

module.exports = router