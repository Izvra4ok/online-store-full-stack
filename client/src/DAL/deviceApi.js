import {$host, $authHost} from "./index";

export const createType = async (type) => {
    try {
        const {data} = await $authHost.post("api/type", type);
        return data
    } catch (e) {
        console.log(`${e}:`, e)
    }

};

export const fetchTypes = async () => {
    try {
        const {data} = await $host.get("api/type");
        return data
    } catch (e) {
        console.log(`${e}:`, e)
    }
};


export const createBrand = async (brand) => {
    try {
        const {data} = await $authHost.post("api/brand", brand);
        return data
    } catch (e) {
        console.log(`${e}:`, e)
    }
};

export const fetchBrands = async () => {
    try {
        const {data} = await $host.get("api/brand");
        return data
    } catch (e) {
        console.log(`${e}:`, e)
    }
};


export const createDevice = async (device) => {
    try {
        const {data} = await $authHost.post('api/device', device)
        return data
    } catch (e) {
        console.log(`${e}:`, e)
    }
};

export const fetchDevices = async (typeId, brandId, page = 1, limit = 9) => {
    try {
        const {data} = await $host.get("api/device", {params: {typeId, brandId, page, limit}});
        return data
    } catch (e) {
        console.log(`${e}:`, e)
    }
};

export const fetchOneDevice = async (id) => {
    try {
        const {data} = await $host.get(`api/device/${id}`);
        let storage = JSON.stringify(data.id);
        localStorage.setItem('currentDeviceId', storage);
        return data
    } catch (e) {
        console.log(`${e}:`, e)
    }

};