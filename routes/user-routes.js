const { signUp, login } = require("../controllers/auth-controller");
const { getUser } = require("../controllers/user-controller");
const verifyTokens = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/user", verifyTokens, getUser);


module.exports = router;