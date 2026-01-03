import jwt from 'jsonwebtoken';



export const companyAuth = (req, res, next) => {
    try {
        const { companyToken } = req.cookies;
        if (!companyToken) {
            return res.json({ success: false, msg: 'Not Authorized Login Again' });
        }
        const decodeId = jwt.verify(companyToken, process.env.JWT_SECRET)
        req.companyId = decodeId.id;
        next()
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}