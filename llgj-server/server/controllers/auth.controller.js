/*
 * @Author: Roy Chen 
 * @Date: 2017-12-13 00:29:42 
 * @Last Modified by: Roy Chen
 * @Last Modified time: 2017-12-13 01:41:11
 */

import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Auth from '../models/auth.model';
import User from '../models/user.model';
import Utils from '../helpers/Utils';
import config from '../../config/config';
const passport = require('passport');
/**
 * Load auth and append to req.
 */
function load(req, res, next, id) {
    Auth.get(id)
        .then((auth) => {
            req.auth = auth; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get auth
 * @returns {Auth}
 */
function get(req, res) {
    return res.json(req.auth);
}

/**
 * Returns jwt token if valid authname and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    passport.authenticate('local.login', (err, auth, info) => {
        if (err) {
            return next(new APIError(info, httpStatus.NOT_FOUND, true));
        }
        if (auth) {
            return res.json({
                status: 0,
                type: 'SUCCESS',
                data: {
                    token: auth.generateJwt(),
                    auth: auth,
                }

            });
        }
        return next(new APIError(info, httpStatus.UNAUTHORIZED, true));
    })(req, res);
}

/**
 * Logout
 * @param req
 * @param res
 * @param next
 */
function logout(req, res, next) {
    // process to remove the token from cache
    // TODO
    res.json({
        status: 1
    });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.auth is assigned by jwt middleware if valid token is provided
    return res.json({
        abc: req.user,
        payload: req.payload,
        num: Math.random() * 100,
        aa: 'aa'
    });
}

async function register(req, res, next) {
    try {
        const auth = await Auth.findOne({
            identifier: req.body.mobile
        });
        if (auth) {
            return res.json({
                status: 1,
                type: 'HAS_REGISTERED_MOBILE',
                message: '手机号码已注册',
            });
        } else {
            const user = new User({
                nickname: Utils.genNickname(req),
                avatar: 'http://ojv9my13c.bkt.clouddn.com/avatar.jpeg',
                register_ip: Utils.getClientIp(req)
            });
            user.save()
                .then((savedUser) => {
                    const auth = new Auth({
                        user_id: savedUser._id,
                        identity_type: config.identity_type.mobile,
                        identifier: req.body.mobile
                    });
                    auth.setPassword(req.body.password);
                    auth.save()
                        .then((savedAuth) => {
                            return res.json({
                                status: 0,
                                data: {
                                    token: savedAuth.generateJwt(),
                                    auth: savedAuth,
                                    user: savedUser
                                },
                                Type: 'SUCCESS',
                                message: '手机号码注册成功'
                            });
                        })
                        .catch(e => next(e));
                })
                .catch(e => next(e));
        }
    } catch (err) {
        next(err);
    }
}

export default {
    load,
    get,
    login,
    logout,
    getRandomNumber,
    register
};
