import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let token = req.cookies.token || req.headers["authorization"];

    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // Remove "Bearer " from the token
    }

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err); // Log the error
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.userId = decoded.id;
        next();
    });
};

export default verifyToken;
