import jwt from "jsonwebtoken"

const SECRETKEY = "clave_secreta"

const generateToken = async (data) => {
    const payload = {
        email: data.email,
        password: data.password
    }
    const tkn = await jwt.sign(payload, SECRETKEY, { expiresIn: '5m'})
    return tkn
}

const verifyToken = async (req, res, next) => {
    const tkn = req.headers.authorization
    if (!tkn) {
        return res.status(401).json({ message: "Token no proporcionado." })
    }
    try {
        const decoded = await jwt.verify(tkn, SECRETKEY)
        if (!decoded) return res.status(401).json({ message: "Token inválido." })
        next()
    } catch (err) {
        return res.status(401).json({ message: "Token inválido." })
    }
}

export default {
    generateToken,
    verifyToken
}
