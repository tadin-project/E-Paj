const express = require("express");
const { UserC } = require("../controllers/controllers");
const { responseHandler } = require("../helpers/helpers");

const router = express.Router();

// login
router.post("/", (req, res) => {
  res.status(200).json(
    responseHandler({
      status: true,
      payload: {
        accessToken: "12121",
      },
    })
  );
});

// register
router.post("/register", (req, res) => {});

// refresh
router.get("/refresh", (req, res) => {});

// forgot
router.post("/forgot", (req, res) => {});

// logout
router.get("/logout", (req, res) => {});

module.exports = router;
