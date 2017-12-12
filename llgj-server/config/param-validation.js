/*
 * @Author: Roy Chen 
 * @Date: 2017-12-12 23:56:05 
 * @Last Modified by: Roy Chen
 * @Last Modified time: 2017-12-13 00:52:32
 */

import Joi from 'joi';

export default {
    // POST /api/auth/register
    register: {
        body: {
            mobile: Joi.string().required(),
            password: Joi.string().required()
        }
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            nickname: Joi.string().required(),
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            mobile: Joi.string().required(),
            password: Joi.string().required()
        }
    }
};
