import jwt from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.json({ success: false, msg: 'Not Authorized, Login Again Please' })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodeToken.id;
        next();
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}