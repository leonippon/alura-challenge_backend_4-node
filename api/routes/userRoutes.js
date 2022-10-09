const { Router, request } = require('express');
const verifyToken = require('../config/userAuth.js');
const UserController = require('../controllers/userController.js');

const router = Router();

router
    // CREATE
    .post("/signUp", UserController.createUser)

    // READ
    .get("/signIn", UserController.loginUser)

    // UPDATE
    .put("/updateUser", verifyToken, UserController.updateUser)

    // DELETE
    .delete("/deleteUser", verifyToken,  UserController.deleteUser)

module.exports = router;