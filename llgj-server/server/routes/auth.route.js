/*
 * @Author: Roy Chen 
 * @Date: 2017-12-13 00:34:27 
 * @Last Modified by: Roy Chen
 * @Last Modified time: 2017-12-13 00:35:30
 */
import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/register */
router.route('/register')
    .post(validate(paramValidation.register), authCtrl.register);

router.route('/login')
    .post(validate(paramValidation.login), authCtrl.login);

router.route('/logout')
    .post(authCtrl.logout);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
    .get(expressJwt({
        secret: config.jwtSecret
    }), authCtrl.getRandomNumber);

export default router;
