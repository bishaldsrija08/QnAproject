const { userRegister, renderRegisterPage, renderLoginPage, userLogin, renderHomepage, renderForgotPasswordPage, handleForgotPassword, renderVerifyOTP, veryfyOtp, renderResetPassword } = require("../controllers/authController");

const router = require("express").Router();

router.route('/register')
  .post(userRegister)
  .get(renderRegisterPage);

  router.route('/login').get(renderLoginPage).post(userLogin)
  router.route('/').get(renderHomepage)


  router.route("/forgot-password").get(renderForgotPasswordPage).post(handleForgotPassword)

  router.route("/otp-check").get(renderVerifyOTP)
  router.route('/otp-check/:id').post(veryfyOtp)

  router.route("/reset-password").get(renderResetPassword)
module.exports = router;