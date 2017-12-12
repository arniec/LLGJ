/*
 * @Author: Roy Chen 
 * @Date: 2017-12-12 23:54:27 
 * @Last Modified by: Roy Chen
 * @Last Modified time: 2017-12-12 23:55:00
 */

import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
    // 昵称
    nickname: {
        type: String,
        required: '昵称是必填项'
    },
    // 头像
    avatar: {
        type: String
    },
    // 联系方式
    contact: {
        type: String
    },
    // 状态
    status: {
        type: Number,
        required: true,
        default: 1
    },
    // 角色
    roles: {
        type: [String],
        default: ['user']
    },
    // 注册IP
    register_ip: {
        type: String
    },
    // 登录时间
    login_time: {
        type: Date
    },
    // 登录IP
    login_ip: {
        type: String
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    updated_time: {
        type: Date
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: '_v'
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {
    /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((user) => {
                if (user) {
                    return user;
                }
                const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List users in descending order of 'created' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({
        skip = 0,
        limit = 50
    } = {}) {
        return this.find()
            .sort({
                created: -1
            })
            .skip(skip)
            .limit(limit)
            .exec();
    }
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
