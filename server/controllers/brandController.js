const {Brand} = require("../models/models");
const ApiError = require('../error/ApiError');

class BrandController {

    async create(request, response, next) {
        try {
            const {name} = request.body
            const brand = await Brand.create({name})
            return response.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(request, response, next) {
        try {
            const brands = await Brand.findAll()
            return response.json(brands)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BrandController();