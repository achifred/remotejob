const express = require("express");

const router = express.Router();

const {
    signup,
    login,
    allUsers,
    deleteAccount
} = require("../controller/users");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", allUsers);
router.delete("/delete/:id", deleteAccount);

module.exports = router;
