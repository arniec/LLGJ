/*
 * @Author: Roy Chen 
 * @Date: 2017-12-13 00:44:25 
 * @Last Modified by: Roy Chen
 * @Last Modified time: 2017-12-13 01:27:13
 */
import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import config from '../../config/config';
import roles from '../helpers/roles';

const router = express.Router(); // eslint-disable-line new-cap
const authRequired = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'payload'
});

router.route('/')
    /** GET /api/users - Get list of users */
    .get(authRequired, roles('admin'), userCtrl.list);
    // .get(userCtrl.list);

router.route('/me')
    .get(authRequired, roles('user'), userCtrl.me);

/** POST /api/users - Create new user */
// .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:userId')
    /** GET /api/users/:userId - Get user */
    .get(userCtrl.get)
    /** POST /api/users/:userId - Update user */
    .post(authRequired, roles('user'), validate(paramValidation.updateUser), userCtrl.update)
    /** DELETE /api/users/:userId - Delete user */
    .delete(authRequired, roles('admin'), userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;
