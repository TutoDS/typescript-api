// Config Vars (.env)
import config from '@config';
const { adminName, adminEmail, adminPwd } = config;

// Mongoose Connection
import connection from '@config/connection';

// List of Roles
import roles from './roles.json';

// Molds
import Role from '@models/Role';
import User from '@models/User';

import { exit } from 'process';

connection
	.then(async (mongoose) => {
		try {
			console.log('[SETUP START]');

			await roles.map(async (role) => {
				const dbRole = await Role.findOne({ name: role.name });

				if (dbRole) {
					console.log(`[ROLE ${role.name} ALREADY EXIST]`);
				} else {
					await new Role(role).save();
					console.log(`[ROLE ${role.name} INSERTED ON DATABASE]`);
				}
			});

			const adminUser = await User.findOne({ email: adminEmail });

			if (adminUser) {
				console.log('[ADMIN ALREADY EXISTS]');
			} else {
				const adminRole = await Role.findOne({ name: 'ADMIN' });
				console.log(adminRole);
				await new User({
					name: adminName,
					email: adminEmail,
					password: adminPwd,
					role: adminRole['_id'],
				}).save();

				// Print USER DATA
				console.log(`\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
				console.log(`NAME:  ${adminName}`);
				console.log(`EMAIL: ${adminEmail}`);
				console.log(`PASSWORD: ${adminPwd}`);
				console.log(`ROLE: ADMIN`);
				console.log(`SCOPES: All`);
				console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`);
			}

			console.log('\n[SETUP DONE]');
		} catch (error) {
			console.error(error);
		}
		// Stop TS-Node
		exit();
	})
	.catch(console.error);
