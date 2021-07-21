import fetch from "./manager"
import path from "./api"
import { POST } from "./requestMethods"

export function getShopList(params) {
    return fetch({
        url: path.login,
        method: POST,
        params: params
    })
}
