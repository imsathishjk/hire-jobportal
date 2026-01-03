import jwt from 'jsonwebtoken';
export const generateToken = (id) => {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token
}