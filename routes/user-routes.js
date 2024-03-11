const { signUp, login, logout } = require("../controllers/auth-controller");
const { getUser } = require("../controllers/user-controller");
const { refreshToken } = require("../middlewares/refreshToken");
const verifyTokens = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/user", verifyTokens, getUser);
router.get("/refresh", refreshToken, verifyTokens, getUser);
router.post("/logout", verifyTokens, logout);


module.exports = router;