require("dotenv")
const ApiError = require("../error/ApiError")
const jswebtoken = require("jsonwebtoken")


module.exports = function (request, response, next) {
    if (request.method === "OPTIONS") {
        next()
    }

    try {
        const token = request.headers.authorization.split(" ")[1] //Bearer

        if (!token) {
            return next(ApiError.unauthorized("Не авторизованный пользователь"))
        }

        const tokenDecoded = jswebtoken.verify(token, process.env.SECRET_KEY)
        request.user = tokenDecoded
        next()
    } catch (e) {
        next(ApiError.unauthorized("Пользователь не авторизован"))
    }
}