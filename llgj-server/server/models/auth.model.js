/*
 * @Author: Roy Chen 
 * @Date: 2017-12-12 23:53:48 
 * @Last Modified by:   Roy Chen 
 * @Last Modified time: 2017-12-12 23:53:48 
 */

import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import config from '../../config/config';

const crypto = require('crypto');
/**
 * Auth Schema
 */
const AuthSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    identity_type: {
        type: String,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    credential: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    created_time: {
        type: Date,
        default: Date.now
    },
    updated_time: {
        type: Date
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
AuthSchema.method({
    // 设置密码
    setPassword(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        // 100000代表迭代次数 64代表长度
        this.credential = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
    },
    // 验证密码
    validPassword(password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString('hex');
        return this.credential === hash;
    },
    // 产生 JWT token
    generateJwt() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7); // Token 有效期 7天
        return jwt.sign({
            user_id: this.user_id._id,
            nickname: this.user_id.nickname,
            identifier: this.identifier,
            identity_type: this.identity_type,
            roles: this.user_id.roles,
            exp: parseInt(expiry.getTime() / 1000, 10)
        }, config.jwtSecret);
    }
});

/**
 * Statics
 */
AuthSchema.statics = {
    /**
     * Get auth
     * @param {ObjectId} id - The objectId of auth.
     * @returns {Promise<Auth, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((auth) => {
                if (auth) {
                    return auth;
                }
                const err = new APIError('No such auth exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    /**
     * List auths in descending order of 'created' timestamp.
     * @param {number} skip - Number of auths to be skipped.
     * @param {number} limit - Limit number of auths to be returned.
     * @returns {Promise<Auth[]>}
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
    },
};

/**
 * @typedef Auth
 */
export default mongoose.model('Auth', AuthSchema);
