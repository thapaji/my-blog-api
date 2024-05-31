import { getToken } from "../model/session/SessionModel.js";
import { getUserByEmail } from "../model/users/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const decoded = verifyAccessJWT(authorization);
        if (decoded?.email) {
            const tokenObj = await getToken(authorization)
            const user = await getUserByEmail(decoded.email)
            if (user?._id) {
                user.password = undefined;
                req.userInfo = user;
                return next()
            }
        }
        const error = {
            message: 'Unauthorised',
            status: 403
        }
    } catch (error) {
        next(error)
    }
}

export const isAdmin = async (req, res, next) => {
    req.userInfo.role === 'admin' ? next() : res.status(403).json({ message: 'You are not authorized to perform this action' });
}