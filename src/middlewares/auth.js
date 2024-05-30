import { getToken } from "../model/session/SessionModel.js";
import { getUserByEmail } from "../model/users/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization)
        const decoded = verifyAccessJWT(authorization);
        console.log(decoded)
        if (decoded?.email) {
            const tokenObj = await getToken(authorization)
            console.log(tokenObj)
            const user = await getUserByEmail(decoded.email)
            if (user?._id) {

                user.password = undefined;
                req.userInfo = user;
                console.log(user)
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