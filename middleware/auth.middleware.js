//================================================================
//This page middleware functions for authentication
//================================================================

//define middleware
export function isAuthMiddleware(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect("/auth/login");
}
