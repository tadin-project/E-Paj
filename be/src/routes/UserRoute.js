const express = require("express");
const { UserC } = require("../controllers/controllers");

const router = express.Router();

router.route("/").get(UserC.getAllUser).post(UserC.createUser);
router
  .route("/:userId")
  .get(UserC.getUserById)
  .patch(UserC.updateUser)
  .delete(UserC.deleteUser);

module.exports = router;
