/*
 * @Author: Roy Chen 
 * @Date: 2017-12-13 00:45:05 
 * @Last Modified by:   Roy Chen 
 * @Last Modified time: 2017-12-13 00:45:05 
 */
import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
