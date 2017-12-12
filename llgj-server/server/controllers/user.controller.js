/*
 * @Author: Roy Chen 
 * @Date: 2017-12-13 00:36:55 
 * @Last Modified by: Roy Chen
 * @Last Modified time: 2017-12-13 01:35:57
 */
import User from '../models/user.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
    return res.json({
        status: 0,
        type: 'SUCCESS',
        data: {
            user: req.user
        },
        message: '获取用户信息成功'
    });
}

/**
 * 返回自己的信息
 * @param req
 * @param res
 * @param next
 */
function me(req, res, next) {
    User.get(req.payload.user_id)
        .then((user) => {
            req.user = user;
            return res.json({
                status: 0,
                type: 'SUCCESS',
                data: {
                    user: user
                },
                message: '获取用户信息成功'
            });
        })
        .catch(e => next(e));
}

/**
 * Create new user
 * @returns {User}
 */
function create(req, res, next) {
    const user = new User({
        username: req.body.username,
        mobileNumber: req.body.mobileNumber
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Update existing user
 * @returns {User}
 */
function update(req, res, next) {
    const user = req.user;
    user.nickname = req.body.nickname;
    user.avatar = req.body.avatar;
    user.contact = req.body.contact;
    user.updated_time = Date.now();
    // user.updated_by = req.payload.user_id;
    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    const {
        limit = 50, skip = 0
    } = req.query;
    User.list({
            limit,
            skip
        })
        .then(users => res.json({
            status: 0,
            type: 'SUCCESS',
            data: {
                users: users
            },
            message: '获取用户列表成功'
        }))
        .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.user;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}

export default {
    load,
    get,
    me,
    create,
    update,
    list,
    remove
};
