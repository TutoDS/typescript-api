import Router from 'koa-router';

import User from '@models/User';

import genericController from '@controllers/GenericController';
const controller = new genericController(User);

const userRouter = new Router({ prefix: '/users' });

export default userRouter
	.get('/', controller.getAll.bind(controller))
	.get('/:id', controller.getByID.bind(controller));
