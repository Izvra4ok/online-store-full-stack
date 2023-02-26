const uuid = require("uuid")
const path = require("path")
const {Device, DeviceInfo} = require("../models/models")
const ApiError = require("../error/ApiError")

class DeviceController {

    async create(request, response, next) {
        try {
            let {name, price, brandId, typeId, info} = request.body;
            const {img} = await request.files;
            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, "..", "static", fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(inf =>
                    DeviceInfo.create({
                        title: inf.title,
                        description: inf.description,
                        deviceId: device.id
                    }))
            }
            console.log("device:",device, "info",info)
            return response.json(device)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }

    async getAll(request, response, next) {
        try {
            let {brandId, typeId, limit, page} = request.query
            let offset
            page = page || 1
            limit = limit || 10
            offset = page * limit - limit //вычесление отступа отображения товаров

            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
            }
            return response.json(devices)

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOneDevice(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports = new DeviceController();