// 在webpack.js里面设置坏境变量
// 本地测试地址
let host = 'https://192.168.1.22.999'

if (!IS_DEV) {
    // 线上地址
    host = 'https://www.api.com'
}

let url = host + 'api/getinfo/index'

import axios from 'axios'

export const getUserInfo = () => {
    axios.get(url)
}