/**
 * Middleware: requireAdmin
 * Must be used AFTER requireAuth (which populates req.user).
 * Rejects any user who does not have the 'admin' role.
 */
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: admin access required' });
  }
  next();
};
