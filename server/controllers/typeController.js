const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {

    async create(request, response, next) {
        try {
            const {name} = request.body
            const type = await Type.create({name})
            return response.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(request, response, next) {
        try {
            const types = await Type.findAll()
            return response.json(types)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TypeController()