import fetch from "./manager"
import path from "./api"
import { POST } from "./requestMethods"

// 登陆接口
export function Login(params) {
    return fetch({
        url: path.login,
        method: POST,
        data: params
    })
}
// 获取登录用户的菜单列表
export function getMenuList(params) {
    return fetch({
        url: path.menuList,
        method: POST,
        data: params
    })
}


