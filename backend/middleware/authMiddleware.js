import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      name: decoded.name
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

export function isAdmin(req, res, next) {
  if (req.user && req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}