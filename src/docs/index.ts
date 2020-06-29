// Partials
import info from './info.json';
import allSchemas from './schemas';
import config from '@config';

export default {
	...info,
	host: `localhost:${config.port}`,
	basePath: '/api',
	tags: [
		{
			name: 'All',
			description: 'Everything about your Pets',
		},
		{
			name: 'store',
			description: 'Access to Petstore orders',
		},
		{
			name: 'user',
			description: 'Operations about user',
			externalDocs: {
				description: 'Find out more about our store',
				url: 'http://swagger.io',
			},
		},
	],
	schemes: ['http'],
	...allSchemas,
	paths: {
		'/': {
			get: {
				tags: ['All'],
				summary: 'Base Endpoint',
				description: '',
				operationId: 'apiStatus',
				produces: ['application/json'],
				responses: {
					'200': {
						description: 'ok, api run',
						schema: {
							type: 'object',
							properties: {
								status: {
									type: 'string',
									example: 'API working fine!',
								},
							},
						},
					},
				},
			},
		},
	},
};
