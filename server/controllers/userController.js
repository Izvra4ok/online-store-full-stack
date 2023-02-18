require("dotenv")
const ApiError = require("../error/ApiError")
const bcrypt = require("bcrypt");
const jsonwebtoket = require("jsonwebtoken")
const {User, Basket} = require("../models/models")

const generateJsWebToken = (id, email, role) => {
    return jsonwebtoket.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"})
}


class UserController {
    async registration(request, response, next) {
        try {
            const {email, password, role} = request.body

            if (!email || !password) {
                return next(ApiError.badRequest("Incorrect email or password"))
            }

            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest("Пользователь с таким имененм существует"))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = User.create({email, password: hashPassword, role})
            const basket = await Basket.create({userId: user.id})
            const token = generateJsWebToken(user.id, user.email, user.role)
            return response.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async login(request, response, next) {
        try {
            const {email, password} = request.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.internal("User not found"))
            }

            let correctPassword = bcrypt.compareSync(password, user.password)

            if (!correctPassword) {
                return next(ApiError.internal("Incorrect password"))
            }

            const token = generateJsWebToken(user.id, user.email, user.role)
            return response.json({token})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async checkAuth(request, response, next) {
        try {
            const token = generateJsWebToken(request.user.id, request.user.email, request.user.role)
            return response.json({token})
        } catch (e) {
            return next(ApiError.unauthorized(e.message))
        }
    }
}

module.exports = new UserController();