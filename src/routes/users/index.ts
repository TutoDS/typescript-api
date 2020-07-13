import Router from 'koa-router';

import User from '@models/User';

import genericController from '@controllers/GenericController';
const controller = new genericController(User);

import UserController from '@controllers/UserController';
const userController = new UserController();

const userRouter = new Router({ prefix: '/users' });

export default userRouter
	.get('/', controller.getAll.bind(controller))
	.post('/', userController.create.bind(userController))
	.get('/:id', controller.getByID.bind(controller));
