// Config Vars (.env)
import config from '@config';

// Mongoose Connection
import connection from '@config/connection';

// List of roles with scopes
import roles from './roles.json';

// Models
import Role from '@models/Role';
import User from '@models/User';

import { exit } from 'process';

const { adminName, adminEmail, adminPwd } = config;

connection
	.then(async () => {
		try {
			console.log('[SETUP START]');

			// Insert roles on JSON
			await roles.map(async (role) => {
				const dbRole = await Role.findOne({ name: role.name });

				// If exist not insert
				if (dbRole) {
					console.log(`[ROLE ${role.name} ALREADY EXIST]`);
				} else {
					await new Role(role).save();
					console.log(`[ROLE ${role.name} INSERTED ON DATABASE]`);
				}
			});

			// Find User
			const adminUser = await User.findOne({ email: adminEmail });

			// Validate if Admin Exist
			if (adminUser) {
				console.log('[ADMIN ALREADY EXISTS]');
			} else {
				const adminRole = await Role.findOne({ name: 'ADMIN' });
				
				await new User({
					name: adminName,
					email: adminEmail,
					password: adminPwd,
					role: adminRole['_id'],
				}).save();

				// Print USER DATA
				console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
				console.log(`📍NAME:  ${adminName}`);
				console.log(`📍EMAIL: ${adminEmail}`);
				console.log(`📍PASSWORD: ${adminPwd}`);
				console.log('📍ROLE: ADMIN');
				console.log('📍SCOPES: All');
				console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
			}

			console.log('\n[SETUP DONE]');
		} catch (error) {
			console.error(error);
		}
		// Stop Setup Execution
		exit();
	})
	.catch(console.error);
