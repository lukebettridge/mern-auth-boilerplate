const router = require("express").Router();

router.post("/register", require("./register"));
router.post("/login", require("./login"));
router.post("/reset-password", require("./reset-password").post);
router.get("/reset-password", require("./reset-password").get);

module.exports = router;
