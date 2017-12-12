/*
 * @Author: Roy Chen 
 * @Date: 2017-12-12 22:29:03 
 * @Last Modified by: Roy Chen
 * @Last Modified time: 2017-12-12 23:36:58
 */

/**
 * 获取用户的IP地址
 * @param req
 * @returns {*}
 */
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}
/**
 * 生成昵称
 * @param req
 */
function genNickname(req) {
    return (req.body.nickname === null ||
        req.body.nickname === undefined) ? req.body.mobile : req.body.nickname;
}


/**
 * 生成随机数
 * @param length
 */
function genRandomCode(length) {
    var Num = '';
    for (var i = 0; i < length; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}

export default {
    getClientIp,
    genNickname,
    genRandomCode
};
