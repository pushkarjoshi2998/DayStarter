// middleware/auth.js
module.exports = function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next(); //continue
  }
  res.redirect("/login"); //send bcak to login page
};