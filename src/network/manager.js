import axios from "axios"
import { ElMessage } from "element-plus";
import { getUrl } from '../utils/util'

// 调用axios.create方法，配置一些属性，返回一个新的axios
const request = axios.create({
    baseURL: getUrl(),
    //请求超时时间
    timeout: 35000,
})

const params = {
    token: sessionStorage.getItem('loginInfo') && sessionStorage.getItem('loginInfo') ? JSON.parse(sessionStorage.getItem("loginInfo")).token : '' || '',
    source: "wmdn_pc",
    appKey: 'XZYJ'
};

// 请求拦截
request.interceptors.request.use(
    //config 代表是你请求的一些信息
    config => {
        // 在请求发送之前配置token
        if (params.token && params.token.length > 0) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = "Bearer " + params.token
            config.headers.source = params.source
            config.headers['Content-Type'] = 'application/json'
        } else if (config.data.token) {
            config.headers.authorization = "Bearer " + config.data.token
            config.headers.source = params.source
            config.headers['Content-Type'] = 'application/json'
        }
        return config
    },
    error => {
        // 对错误请求的处理
        // 弹出错误请求消息
        ElMessage({
            showClose: true,
            message: error.message,
            type: "error"
        })
        return Promise.reject(error)
    }
)

//  response拦截器 响应拦截器 请求之后的操作
request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default request;

