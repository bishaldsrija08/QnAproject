const { userRegister, renderRegisterPage, renderLoginPage, userLogin, renderHomepage } = require("../controllers/authController");

const router = require("express").Router();

router.route('/register')
  .post(userRegister)
  .get(renderRegisterPage);

  router.route('/login').get(renderLoginPage).post(userLogin)
  router.route('/').get(renderHomepage)

module.exports = router;