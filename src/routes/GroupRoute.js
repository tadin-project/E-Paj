const express = require("express");
const { GroupC } = require("../controllers/controllers");

const router = express.Router();

router.route("/").get(GroupC.getAllGroup).post(GroupC.createGroup);
router
  .route("/:groupId")
  .get(GroupC.getGroupById)
  .patch(GroupC.updateGroup)
  .delete(GroupC.deleteGroup);

module.exports = router;
