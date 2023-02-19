import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: "Холодильники",},
            {id: 2, name: "Смартфоны",},
            {id: 3, name: "Телевизоры",},
            {id: 4, name: "Видеокамеры",},
            {id: 5, name: "Газовые плиты",},
            {id: 6, name: "Туризм",},
            {id: 7, name: "Красота",},

        ]
        this._brands = [
            {id: 1, name: "LG",},
            {id: 2, name: "Apple",},
            {id: 3, name: "Xiaomi",},
            {id: 4, name: "SAMSUNG",},
            {id: 5, name: "LENOVO",},
            {id: 6, name: "HUYAVEI",},
            {id: 7, name: "INDESIT",},
        ]
        this._devices = [
            {
                id: 1,
                name: "Iphone 12 pro",
                price: 25000,
                rating: 4,
                img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204"
            },
            {
                id: 2,
                name: "Iphone 13 pro",
                price: 35000,
                rating: 5,
                img: "data:image/jpeg;base64,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"
            },
            {
                id: 3,
                name: "Xiaomi  1c",
                price: 25000,
                rating: 1,
                img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204"
            },
            {
                id: 4,
                name: "LG 111",
                price: 25000,
                rating: 5,
                img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204"
            },
            {
                id: 5,
                name: "Iphone 14 max",
                price: 25000,
                rating: 4,
                img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204"
            },
            {
                id: 6,
                name: "Iphone 10 pro max",
                price: 25000,
                rating: 1,
                img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204"
            },
            {
                id: 7,
                name: "Iphone 12 lite",
                price: 25000,
                rating: 1,
                img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone14pro-202209_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1663611329204"
            },
        ]
        this._selectedType = {}
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setUser(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }
}