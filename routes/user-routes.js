const router = require("express").Router();
const { authentication, registration } = require("../controller/user-controller");

router.post("/registration", registration);
router.post("/authentication", authentication);

module.exports = router;