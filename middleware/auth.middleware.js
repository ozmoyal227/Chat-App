export function isAuthMiddleware(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect("/auth/login");
}
