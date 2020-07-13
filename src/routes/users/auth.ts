import Router from 'koa-router';

import UserController from '@controllers/UserController';
const controller = new UserController();

const authRouter = new Router();

export default authRouter
	.post('/login', controller.startSession.bind(controller));
// .post('/reset-password', (ctx, next) => {})
// .post('/change-password/:token', (ctx, next) => {});
