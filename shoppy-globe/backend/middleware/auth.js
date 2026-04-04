import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // 1. Check if header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Access Denied: No valid Authorization header");
    return res.status(401).send("Access Denied");
  }

  // 2. Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user data to the request object
    // verified usually contains { id: "...", iat: ..., exp: ... }
    req.user = verified; 
    
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(403).send("Invalid or Expired Token");
  }
};

export default verifyToken;